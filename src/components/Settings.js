import { useMemo, useState } from "react";
import { Button, Content, Form, Icon } from "react-bulma-components";
import { useCopyToClipboard, useToggle } from "react-use";
import { contentTypes, headerFixes } from "../hooks/useSettings";
import joinStyle from "../util/joinStyle";

function SettingsSelect({ name, obj, value, setValue }) {
  return (
    <Form.Field p={1}>
      <Form.Label>{name}</Form.Label>
      <Form.Control>
        <Form.Select value={value} onChange={(e) => setValue(e.target.value)}>
          {Object.entries(obj).map(([label, value]) => (
            <option value={value}>{label}</option>
          ))}
        </Form.Select>
      </Form.Control>
    </Form.Field>
  );
}

export default function Settings({
  type,
  setType,
  headerFix,
  setHeaderFix,
  settingsCode,
  url,
  onUrlChange,
  title,
  onTitleChange,
}) {
  const [showSettings, toggleShowSettings] = useToggle(!url);
  const [innerUrl, setInnerUrl] = useState(url);
  const [innerTitle, setInnerTitle] = useState(title);
  const [ctc, copyToClipboard] = useCopyToClipboard();
  const viewUrl = useMemo(
    () =>
      `${
        window.location.href.split("?")[0]
      }?url=${url}&settings=${settingsCode}&title=${title}`,
    [url, settingsCode, title]
  );

  function handleChangeUrl(e) {
    e.preventDefault();

    onUrlChange(innerUrl);
  }

  function handleChangeTitle(e) {
    e.preventDefault();

    onTitleChange(innerTitle);
  }

  return (
    <Content>
      <Content display="flex" justifyContent="flex-end">
        <Button
          size="small"
          style={{
            borderColor: "transparent",
          }}
          onClick={toggleShowSettings}
        >
          <Icon>
            <i class="fa-solid fa-gear"></i>
          </Icon>
        </Button>
      </Content>
      {showSettings && (
        <>
          <form onSubmit={handleChangeUrl}>
            <Content>
              <Form.Field>
                <Form.Label>
                  Enter the URL of the data you'd like to view.
                </Form.Label>
                <Form.Control>
                  <Form.Input
                    value={innerUrl}
                    onChange={(e) => setInnerUrl(e.target.value)}
                    color={joinStyle(innerUrl !== url && "warning")}
                  />
                </Form.Control>
              </Form.Field>
            </Content>
          </form>
          <form onSubmit={handleChangeTitle}>
            <Content>
              <Form.Field>
                <Form.Label>Title</Form.Label>
                <Form.Control>
                  <Form.Input
                    value={innerTitle}
                    onChange={(e) => setInnerTitle(e.target.value)}
                    color={joinStyle(innerTitle !== title && "warning")}
                  />
                </Form.Control>
              </Form.Field>
            </Content>
          </form>
          <Content display="flex">
            <SettingsSelect
              name="Content Type"
              obj={contentTypes}
              value={type}
              setValue={setType}
            />
            <SettingsSelect
              name="Header Format"
              obj={headerFixes}
              value={headerFix}
              setValue={setHeaderFix}
            />
          </Content>
          <Content>
            <Form.Field>
              <Form.Label>Share this URL</Form.Label>
              <Form.Control onClick={() => url && copyToClipboard(viewUrl)}>
                <Form.Input
                  readOnly
                  value={!url ? "" : viewUrl}
                  color={joinStyle(
                    ctc.error && "danger",
                    ctc.value && "success"
                  )}
                  disabled={!url}
                />
                <Icon align="left" size="small">
                  <i class="fa-solid fa-link"></i>
                </Icon>
                <Icon align="right" size="small">
                  <i
                    class={joinStyle(
                      "fa-solid",
                      ctc.value ? "fa-check" : "fa-share"
                    )}
                  ></i>
                </Icon>
              </Form.Control>
            </Form.Field>
          </Content>
        </>
      )}
    </Content>
  );
}
