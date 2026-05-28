import clsx from "clsx";
import ColorCard from "../components/common/ColorCard";
import CommonLayout from "../components/common/Layout";
import LinkWithBaseUrl from "../components/common/LinkWithBaseUrl";
import configData, { IPoweredByUser } from "../consts/poweredBy";
import styles from "../css/pages/powered-by.module.scss";

const {
  titleText,
  subText,
  introText,
  submitTitle,
  submitText,
  submitButtonText,
  submitButtonUrl,
  guidelines,
  users,
} = configData;

function UserCard({ user }: { user: IPoweredByUser }) {
  const inner = (
    <>
      <div className={styles.logoBox}>
        {user.logo ? (
          <img src={user.logo} alt={`${user.name} logo`} loading="lazy" />
        ) : (
          <span className={styles.logoFallback}>{user.name}</span>
        )}
      </div>
      <div className={styles.userName}>{user.name}</div>
      {user.region && <div className={styles.userMeta}>{user.region}</div>}
      {user.description && (
        <div className={styles.userDesc}>{user.description}</div>
      )}
    </>
  );

  if (user.website) {
    return (
      <LinkWithBaseUrl
        href={user.website}
        className={styles.logoCard}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </LinkWithBaseUrl>
    );
  }

  return <div className={styles.logoCard}>{inner}</div>;
}

export default function PoweredBy() {
  return (
    <CommonLayout>
      <ColorCard titleText={titleText} subText={subText} />
      <div className={clsx(styles.mainContent)}>
        <p className={styles.intro}>{introText}</p>

        {users.length > 0 ? (
          <>
            <h2 className={styles.sectionTitle}>Adopters</h2>
            <div className={styles.logoGrid}>
              {users.map((user) => (
                <UserCard key={user.name} user={user} />
              ))}
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            We are gathering the first wave of public adopters. If your team
            runs Apache Cloudberry, you can be the first to be featured here.
          </div>
        )}

        <section className={styles.submitSection}>
          <h2 className={styles.submitTitle}>{submitTitle}</h2>
          <p className={styles.submitText}>{submitText}</p>
          <ul className={styles.guidelines}>
            {guidelines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <LinkWithBaseUrl
            href={submitButtonUrl}
            className={styles.submitButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            {submitButtonText}
          </LinkWithBaseUrl>
        </section>
      </div>
    </CommonLayout>
  );
}
