import { useState } from "react";
import { Box, Container } from "react-bulma-components";
import { useSearchParam } from "react-use";
import DataTable from "./components/DataTable";
import Settings from "./components/Settings.js";
import useSettings from "./hooks/useSettings";

import "bulma/css/bulma.min.css";
import "./style.css";

function App() {
  const urlParam = useSearchParam("url");
  const [url, setUrl] = useState(urlParam);
  const settingsParam = useSearchParam("settings");
  const settings = useSettings(settingsParam);

  return (
    <Container>
      <Box>
        <Settings
          {...settings}
          url={url}
          onUrlChange={(newUrl) => setUrl(newUrl)}
        />
        <DataTable url={url} type={settings.type} />
      </Box>
    </Container>
  );
}

export default App;
