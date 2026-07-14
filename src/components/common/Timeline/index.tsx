import React from "react";
import styles from "./styles.module.scss";

export interface TimelineLink {
  /** Link label shown to the user */
  label: string;
  /** Target URL (internal path like /blog/... or full URL) */
  url: string;
}

export interface TimelineItem {
  /** Display date, e.g. "June 2022" */
  date: string;
  /** Event title */
  title: string;
  /** Short description */
  description: string;
  /** Optional reference links shown below the description */
  links?: TimelineLink[];
}

interface TimelineProps {
  items: TimelineItem[];
  /** When true, the first item is treated as the latest (pulse animation).
   *  Default: last item is latest (chronological order). */
  reversed?: boolean;
}

export default function Timeline({ items, reversed }: TimelineProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const lastIndex = items.length - 1;

  return (
    <div className={styles.timeline}>
      {items.map((item, index) => {
        const isLast = index === lastIndex;
        const isLatest = reversed ? index === 0 : index === lastIndex;

        return (
          <div key={index} className={styles.item}>
            {/* Marker column: dot + connecting line */}
            <div className={styles.marker}>
              <div
                className={`${styles.dot} ${isLatest ? styles.dotLatest : ""}`}
              />
              {!isLast && <div className={styles.line} />}
            </div>

            {/* Content column */}
            <div className={styles.content}>
              <time className={styles.date}>{item.date}</time>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.description}</p>
              {item.links && item.links.length > 0 && (
                <div className={styles.links}>
                  {item.links.map((link, li) => (
                    <a
                      key={li}
                      href={link.url}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
