import { useMemo } from "react";
import { Progress } from "react-bulma-components";
import useRemote, { statuses } from "../hooks/useRemote";
import {
  camelCaseToHeaderCase,
  kebabCaseToHeaderCase,
  screamingSnakeCaseToHeaderCase,
  snakeCaseToHeaderCase,
} from "../util/headerFixes";
import DynamicTable from "./DynamicTable";

function Error({ errorMessage }) {
  return <div>{errorMessage}</div>;
}

function Loading() {
  return <Progress />;
}

const headerFormatters = [
  (e) => e,
  snakeCaseToHeaderCase,
  camelCaseToHeaderCase,
  screamingSnakeCaseToHeaderCase,
  kebabCaseToHeaderCase,
];

export default function DataTable({ url, type, headerFix }) {
  const { data, error, status } = useRemote(url, type);
  const headerFormatter = useMemo(
    () => headerFormatters[headerFix],
    [headerFix]
  );

  switch (status) {
    case statuses.errored:
      return <Error errorMessage={error} />;
    case statuses.loaded:
      return <DynamicTable data={data} headerFormatter={headerFormatter} />;
    case statuses.waiting:
      return <Loading />;
    default:
      throw new Error("How did we get here?");
  }
}
