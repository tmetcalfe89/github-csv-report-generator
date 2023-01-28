import { Progress } from "react-bulma-components";
import useRemote, { statuses } from "../hooks/useRemote";
import DynamicTable from "./DynamicTable";

function Error({ errorMessage }) {
  return <div>{errorMessage}</div>;
}

function Loading() {
  return <Progress />;
}

export default function DataTable({ url }) {
  const { data, error, status } = useRemote(url);

  switch (status) {
    case statuses.errored:
      return <Error errorMessage={error} />;
    case statuses.loaded:
      return <DynamicTable data={data} />;
    case statuses.waiting:
      return <Loading />;
    default:
      throw new Error("How did we get here?");
  }
}
