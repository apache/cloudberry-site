interface IProps {
  tableColumns: { label: string; prop: string; width?: string | number }[];
  data: Record<string, React.ReactNode>[];
  className?: string;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
}

/**
 * Lightweight, semantic table. Renders a real <table> with no wrapper
 * <div> so it inherits the shared markdown table styling (fit-content
 * width, centered, brand-aligned headers) from design-style.scss when
 * rendered inside <article class="markdown">.
 */
export default function Table(props: IProps) {
  return (
    <table className={props.className} style={props.style}>
      <thead style={props.headerStyle}>
        <tr>
          {props.tableColumns.map((column) => (
            <th key={column.label} style={{ width: column.width }}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody style={props.bodyStyle}>
        {props.data.map((row, i) => (
          <tr key={i}>
            {props.tableColumns.map((column) => (
              <td key={column.label}>{row[column.prop]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
