import ColorCard from "../components/common/ColorCard";
import CommonLayout from "../components/common/Layout";
import Table from "../components/common/Table";
import configData from "../consts/support";
import styles from "../css/pages/support.module.scss";

const {
  tableData,
  contentTextDesc,
  subText,
  titleText,
  communitySupportText,
  commercialDesc,
  commercialSupportText,
} = configData;

export default function Support() {
  return (
    <CommonLayout>
      <ColorCard titleText={titleText} subText={subText} />
      <div className={styles.mainContent}>
        {/*
         * Use the shared "markdown" article shell so the table, lists,
         * blockquotes etc. inherit the exact same styling as Docs and
         * MDX sub-pages (Community / Contribute / Team).
         */}
        <article className="markdown">
          <p>{contentTextDesc}</p>

          <h2>{communitySupportText}</h2>
          <Table
            data={tableData}
            tableColumns={[
              { label: "Type", prop: "type" },
              { label: "Description", prop: "desc" },
            ]}
          />

          <h2>{commercialSupportText}</h2>
          <p>{commercialDesc}</p>
        </article>
      </div>
    </CommonLayout>
  );
}
