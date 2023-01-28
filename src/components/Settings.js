import { useMemo, useState } from "react";
import { Content, Form, Icon } from "react-bulma-components";
import { useCopyToClipboard } from "react-use";
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
}) {
  const [innerUrl, setInnerUrl] = useState(url);
  const [ctc, copyToClipboard] = useCopyToClipboard();
  const viewUrl = useMemo(
    () => `${window.location.origin}/?url=${url}&settings=${settingsCode}`,
    [url, settingsCode]
  );

  function handleChangeUrl(e) {
    e.preventDefault();

    onUrlChange(innerUrl);
  }

  return (
    <Content>
      <form onSubmit={handleChangeUrl}>
        <Content>
          <Form.Field>
            <Form.Label>
              Enter the URL of the data you'd like to view. Hit Enter to
              confirm.
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
          <Form.Control onClick={() => copyToClipboard(viewUrl)}>
            <Form.Input
              readOnly
              value={viewUrl}
              color={joinStyle(ctc.error && "danger", ctc.value && "success")}
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
    </Content>
  );
}