import { useMemo } from "react";

export default function DynamicTable({ data }) {
  const headers = useMemo(() => {
    return [...new Set(data.flatMap((entry) => Object.keys(entry)))];
  }, [data]);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th>{header}</th>
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
    </table>
  );
}
