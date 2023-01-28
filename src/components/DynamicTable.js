import { useMemo } from "react";
import { Table } from "react-bulma-components";

export default function DynamicTable({ data, headerFormatter = (e) => e }) {
  const headers = useMemo(() => {
    return [...new Set(data.flatMap((entry) => Object.keys(entry)))];
  }, [data]);

  return (
    <Table.Container>
      <Table size="fullwidth" striped hoverable>
        <thead>
          <tr>
            {headers.map((header) => (
              <th>{headerFormatter(header)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr>
              {headers.map((header) => (
                <td>{entry[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Table.Container>
  );
}
