import { useMemo, useState } from "react";
import { Content, Pagination, Table } from "react-bulma-components";

export default function DynamicTable({
  data,
  headerFormatter = (e) => e,
  pageSize = 10,
}) {
  const headers = useMemo(() => {
    return [...new Set(data.flatMap((entry) => Object.keys(entry)))];
  }, [data]);
  const [page, setPage] = useState(1);

  return (
    <>
      <Content>
        <Pagination
          current={page}
          onChange={setPage}
          total={Math.ceil(data.length / pageSize)}
          autoHide
          showFirstLast
          align="center"
          delta={3}
        />
      </Content>
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
            {data.slice((page - 1) * pageSize, page * pageSize).map((entry) => (
              <tr>
                {headers.map((header) => (
                  <td>{entry[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Table.Container>
    </>
  );
}
