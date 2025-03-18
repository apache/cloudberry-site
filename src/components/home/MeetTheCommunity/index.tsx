import { MEET_THE_COMMUNITY } from "@site/src/consts/homeContent";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
export default function MeetTheCommunity() {
  return (
    <div className={styles.meetTheCommunity}>
      <div className={styles.highTitle}>{MEET_THE_COMMUNITY.title}</div>
    </div>
  );
}
