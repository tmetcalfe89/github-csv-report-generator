import { useState } from "react";
import { Box, Container, Heading } from "react-bulma-components";
import { useSearchParam } from "react-use";
import DataTable from "./components/DataTable";
import Settings from "./components/Settings.js";
import useSettings from "./hooks/useSettings";

import "bulma/css/bulma.min.css";
import "./style.css";

function App() {
  const urlParam = useSearchParam("url");
  const titleParam = useSearchParam("title");
  const [url, setUrl] = useState(urlParam);
  const [title, setTitle] = useState(titleParam);
  const settingsParam = useSearchParam("settings");
  const settings = useSettings(settingsParam);

  return (
    <Container>
      <Box>
        <Settings
          {...settings}
          url={url}
          onUrlChange={setUrl}
          title={title}
          onTitleChange={setTitle}
        />
        {title && <Heading>{title}</Heading>}
        <DataTable
          url={url}
          type={settings.type}
          headerFix={settings.headerFix}
        />
      </Box>
    </Container>
  );
}

export default App;
