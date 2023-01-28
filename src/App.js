import { Box, Container } from "react-bulma-components";
import { useSearchParam } from "react-use";
import DataTable from "./components/DataTable";

import "bulma/css/bulma.min.css";

function App() {
  const urlParam = useSearchParam("url");

  return (
    <Container>
      <Box>
        <DataTable url={urlParam} />
      </Box>
    </Container>
  );
}

export default App;
