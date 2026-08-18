import React, { useCallback, useEffect, useRef, useState } from "react";
import { useClickAway } from "ahooks";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";

import { markdownPathFor } from "@site/src/components/common/markdownTwin";

import styles from "./styles.module.scss";

function promptFor(markdownUrl: string): string {
  return `Read ${markdownUrl} — I have questions about this Apache Cloudberry documentation page.`;
}

type CopyState = "idle" | "busy" | "done" | "error";

const COPY_LABEL: Record<CopyState, string> = {
  idle: "Copy page",
  busy: "Copying…",
  done: "Copied!",
  error: "Copy failed",
};

export interface Props {
  /** Permalink of the current page, as produced by the content plugin. */
  permalink: string;
  className?: string;
  /**
   * Edge the dropdown grows from. Must match how the trigger itself is aligned
   * in its container -- otherwise the panel opens past the viewport edge on
   * narrow screens.
   */
  align?: "start" | "end";
}

export default function AiActions({
  permalink,
  className,
  align = "end",
}: Props): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [open, setOpen] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  const markdownPath = markdownPathFor(permalink);
  // Deep links are resolved by a third party, so they need the canonical
  // origin -- a dev-server URL would be unreachable to them anyway.
  const prompt = encodeURIComponent(promptFor(`${siteConfig.url}${markdownPath}`));

  useClickAway(() => setOpen(false), containerRef);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Let the transient copy result fall back to the resting label.
  useEffect(() => {
    if (copyState !== "done" && copyState !== "error") {
      return undefined;
    }
    const timer = window.setTimeout(() => setCopyState("idle"), 2200);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  const handleCopy = useCallback(async () => {
    setOpen(false);
    setCopyState("busy");
    try {
      const response = await fetch(markdownPath);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const text = await response.text();
      // A server with no route for `.md` may answer 200 with the SPA shell
      // rather than 404 -- webpack-dev-server's history fallback does exactly
      // that. Copying that HTML would look like success and paste as garbage.
      const contentType = response.headers.get("content-type") ?? "";
      if (contentType.startsWith("text/html") || /^\s*<(?:!doctype|html)\b/i.test(text)) {
        throw new Error("endpoint returned HTML, not Markdown");
      }

      // Unavailable outside secure contexts (plain-HTTP dev hosts); the catch
      // below surfaces that rather than failing silently.
      await navigator.clipboard.writeText(text);
      setCopyState("done");
    } catch {
      setCopyState("error");
    }
  }, [markdownPath]);

  return (
    <div className={clsx(styles.root, className)} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.triggerLabel}>{COPY_LABEL[copyState]}</span>
        <svg
          className={clsx(styles.chevron, open && styles.chevronOpen)}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-hidden="true"
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className={clsx(styles.menu, align === "start" && styles.menuStart)}
          role="menu"
        >
          <button
            type="button"
            role="menuitem"
            className={styles.item}
            onClick={handleCopy}
          >
            <span className={styles.itemLabel}>Copy as Markdown</span>
            <span className={styles.itemHint}>
              Clean page source, ready to paste into a chat
            </span>
          </button>

          <a
            role="menuitem"
            className={styles.item}
            href={markdownPath}
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.itemLabel}>View as Markdown</span>
            <span className={styles.itemHint}>Open the plain-text source</span>
          </a>

          <div className={styles.separator} role="separator" />

          <a
            role="menuitem"
            className={styles.item}
            href={`https://claude.ai/new?q=${prompt}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.itemLabel}>Open in Claude</span>
            <span className={styles.itemHint}>Ask with this page as context</span>
          </a>

          <a
            role="menuitem"
            className={styles.item}
            href={`https://chatgpt.com/?q=${prompt}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.itemLabel}>Open in ChatGPT</span>
            <span className={styles.itemHint}>Ask with this page as context</span>
          </a>
        </div>
      )}
    </div>
  );
}
