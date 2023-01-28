import { Box, Container } from "react-bulma-components";
import { useSearchParam } from "react-use";
import DataTable from "./components/DataTable";

import "bulma/css/bulma.min.css";
import Settings from "./components/Settings.js";
import useSettings from "./hooks/useSettings";

function App() {
  const urlParam = useSearchParam("url");
  const settingsParam = useSearchParam("settings");
  const { settingsCode, ...settings } = useSettings(settingsParam);

  return (
    <Container>
      <Box>
        <Settings {...settings} />
        <DataTable url={urlParam} />
      </Box>
    </Container>
  );
}

export default App;
