import { useEffect } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { initSizing } from "../../components/sizing/logic";
import { t } from "../../components/sizing/strings";
import "../../components/sizing/sizing.css";

export default function SizingCalculator(): JSX.Element {
  useEffect(() => {
    initSizing();
  }, []);

  return (
    <Layout
      title="Sizing Calculator"
      description="Estimate an Apache Cloudberry hardware configuration from your data size and infrastructure type."
    >
      <div className="sizingRoot">
        <div className="sizing-head">
          <h1>{t("title")}</h1>
          <p className="subtitle">{t("subtitle")}</p>
          <Link className="method-link" to="/sizing/methodology">
            {t("nav.method")} →
          </Link>
        </div>

        <section className="sz-card">
          <div className="field-grid">
            <div>
              <label htmlFor="data-size">{t("input.datasize")}</label>
              <div className="sz-row">
                <input id="data-size" type="number" min={0} step="any" defaultValue={100} />
                <select id="data-unit" defaultValue="TB">
                  <option value="GB">GB</option>
                  <option value="TB">TB</option>
                  <option value="PB">PB</option>
                </select>
              </div>
            </div>
            <div>
              <label>{t("input.infra")}</label>
              <div className="sz-tabs" id="infra-tabs">
                <button type="button" data-infra="physical" className="active">{t("infra.physical")}</button>
                <button type="button" data-infra="vm">{t("infra.vm")}</button>
                <button type="button" data-infra="cloud">{t("infra.cloud")}</button>
              </div>
            </div>
          </div>

          <div className="adv" data-for="physical">
            <label>{t("preset.title")}</label>
            <div className="preset-cards" id="preset-cards" />
          </div>

          <div className="adv" data-for="vm">
            <label htmlFor="vm-profile">{t("vmprofile.title")}</label>
            <select id="vm-profile" />
            <p id="vm-profile-hint" className="hint" />
          </div>

          <div className="adv" data-for="cloud">
            <label htmlFor="cloud-scheme">{t("scheme.title")}</label>
            <select id="cloud-scheme" />
          </div>

          <details id="advanced" className="adv" data-for="physical vm cloud">
            <summary>{t("advanced")}</summary>
            <div className="adv-grid">
              <label>
                <span>{t("adv.compression")}</span>
                <input id="compression" type="number" min={1} step="0.5" defaultValue={2} />
              </label>
              <label>
                <span>{t("adv.concurrency")}</span>
                <select id="concurrency" />
              </label>
            </div>
          </details>
          <p id="input-error" className="warn" hidden>{t("err.invalid")}</p>
        </section>

        <section className="sz-card" id="result-card" hidden>
          <div className="result-head">
            <h2>{t("result.title")}</h2>
            <span id="product-line" className="product-chip" />
          </div>
          <p className="callout">{t("disclaimer")}</p>
          <p id="binding-badge" className="sz-badge" hidden />
          <p id="huge-warning" className="warn" hidden>{t("warn.huge")}</p>
          <div className="table-wrap">
            <table id="role-table">
              <thead>
                <tr>
                  <th>{t("col.role")}</th>
                  <th>{t("col.count")}</th>
                  <th>{t("col.spec")}</th>
                  <th>{t("col.note")}</th>
                </tr>
              </thead>
              <tbody />
            </table>
          </div>
          <h2>{t("summary.title")}</h2>
          <table id="summary-table" className="summary">
            <tbody />
          </table>
          <p id="network-line" className="meta-line" />
        </section>
      </div>
    </Layout>
  );
}
