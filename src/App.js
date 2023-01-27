import { useSearchParam } from "react-use";
import DataTable from "./components/DataTable";

function App() {
  const urlParam = useSearchParam("url");

  return (
    <div>
      <DataTable url={urlParam} />
    </div>
  );
}

export default App;
