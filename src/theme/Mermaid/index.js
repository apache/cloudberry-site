/**
 * Swizzle of @theme/Mermaid that renders one diagram at a time.
 *
 * The stock component kicks off `mermaid.render()` from each diagram's own
 * effect, so a page with several diagrams calls into Mermaid concurrently.
 * Mermaid keeps the parsed diagram in module-level state, so those calls
 * overwrite each other and the losers resolve with an empty string -- no
 * throw, nothing in the console, just a blank gap where the diagram was.
 *
 * Measured on the Core Internals chapters before this override, on a freshly
 * loaded page:
 *
 *   ch13  1 flowchart  + 2 sequence  ->  3 of 3 drawn
 *   ch11  3 flowcharts              ->  1 of 3
 *   ch18  7 flowcharts + 2 sequence  ->  2 of 9 (neither of the flowcharts)
 *
 * A client-side navigation remounts the components far enough apart that they
 * all draw, which is why the pages look fine while you are clicking around and
 * broken when someone lands on one from a search result.
 *
 * Serialising the calls costs nothing visible -- each diagram takes a few
 * milliseconds -- and makes the outcome independent of how many are on a page.
 */

import React, {useEffect, useRef, useState} from 'react';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {ErrorBoundaryErrorMessageFallback} from '@docusaurus/theme-common';
import {
  MermaidContainerClassName,
  useMermaidConfig,
} from '@docusaurus/theme-mermaid/client';

import styles from './styles.module.css';

/** One render at a time, process-wide. */
let tail = Promise.resolve();

function enqueue(task) {
  const result = tail.then(task, task);
  // Keep the chain alive whatever this task does.
  tail = result.then(
    () => undefined,
    () => undefined,
  );
  return result;
}

function useSerialMermaid(text, config) {
  const [result, setResult] = useState(null);
  // Mermaid wants an id of its own; React's useId produces one it rejects.
  const [id] = useState(() => `mermaid-svg-${Math.round(Math.random() * 1e7)}`);

  useEffect(() => {
    let cancelled = false;
    enqueue(async () => {
      const {default: mermaid} = await import('mermaid');
      mermaid.initialize(config);
      return mermaid.render(id, text);
    })
      .then((rendered) => {
        if (!cancelled) {
          setResult(rendered);
        }
      })
      .catch((e) => {
        // Mermaid leaves a stray element behind when it fails.
        document.querySelector(`#d${id}`)?.remove();
        if (!cancelled) {
          // Hand the error to the boundary below.
          setResult(() => {
            throw e;
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id, text, config]);

  return result;
}

function MermaidRenderer({value}) {
  const config = useMermaidConfig();
  const rendered = useSerialMermaid(value, config);
  const ref = useRef(null);

  useEffect(() => {
    if (rendered && ref.current) {
      rendered.bindFunctions?.(ref.current);
    }
  }, [rendered]);

  if (!rendered) {
    return null;
  }
  return (
    <div
      ref={ref}
      className={`${MermaidContainerClassName} ${styles.container}`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: rendered.svg}}
    />
  );
}

export default function Mermaid(props) {
  return (
    <ErrorBoundary
      fallback={(params) => <ErrorBoundaryErrorMessageFallback {...params} />}>
      <MermaidRenderer {...props} />
    </ErrorBoundary>
  );
}
