import { useState } from "react";
import { Box, Container, Heading, Message } from "react-bulma-components";
import { useSearchParam } from "react-use";
import DataTable from "./components/DataTable";
import Settings from "./components/Settings.js";
import useSettings from "./hooks/useSettings";

import "bulma/css/bulma.min.css";
import "./style.css";

function InitialMessage() {
  return (
    <Message>
      <Message.Header>Welcome to Tim's Report Generator!</Message.Header>
      <Message.Body>
        <div>Hi friend!</div>
        <div>
          To get started, enter the URL of a data source (either CSV or JSON) in
          the box above and hit enter. Play around with the rest of the settings
          and when you're done, copy the url in the <code>Share this URL</code>{" "}
          box. If you have any issues or feature requests, let me know.
        </div>
        <div>
          If you'd like to see a demo,{" "}
          <a href="/?url=https://raw.githubusercontent.com/tmetcalfe89/report-generator/main/demo/purchases.csv&settings=0|1&title=Purchases">
            click here
          </a>
          !
        </div>
        <div>Enjoy,</div>
        Tim
      </Message.Body>
    </Message>
  );
}

function App() {
  const urlParam = useSearchParam("url");
  const titleParam = useSearchParam("title");
  const [url, setUrl] = useState(urlParam);
  const [title, setTitle] = useState(titleParam === "null" ? "" : titleParam);
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
        {url ? (
          <DataTable
            url={url}
            type={settings.type}
            headerFix={settings.headerFix}
          />
        ) : (
          <InitialMessage />
        )}
      </Box>
    </Container>
  );
}

export default App;
