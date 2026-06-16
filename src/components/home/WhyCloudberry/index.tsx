import { WHY_CLOUDBERRY } from "@site/src/consts/homeContent";
import styles from "./index.module.scss";

const iconMap: Record<string, JSX.Element> = {
  kernel: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" /><path d="M12 17v4" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  ),
  compat: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3h5v5" /><path d="M8 3H3v5" /><path d="M3 16v5h5" /><path d="M21 16v5h-5" />
      <circle cx="12" cy="12" r="3" />
      <path d="m12 12 4-4" /><path d="M8 8 4 4" /><path d="m8 16-4 4" /><path d="m16 16 4 4" />
    </svg>
  ),
  governance: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-3" />
      <path d="M9 9v.01" /><path d="M9 12v.01" /><path d="M9 15v.01" /><path d="M9 18v.01" />
    </svg>
  ),
  performance: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  workloads: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
      <circle cx="7" cy="6" r="1" /><circle cx="7" cy="18" r="1" />
      <circle cx="11" cy="6" r="1" /><circle cx="11" cy="18" r="1" />
    </svg>
  ),
  security: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
};

export default function WhyCloudberry() {
  return (
    <div className={styles.whyCloudberry}>
      <h2 className={styles.sectionTitle}>{WHY_CLOUDBERRY.title}</h2>
      <div className={styles.cardGrid}>
        {WHY_CLOUDBERRY.list.map((item, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.cardIcon}>{iconMap[item.icon]}</div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.content}</p>
          </div>
        ))}
      </div>
      <p className={styles.disclaimer}>{WHY_CLOUDBERRY.disclaimer}</p>
    </div>
  );
}
