import { useMemo } from "react";
import { Box, Content, Form } from "react-bulma-components";
import { contentTypes, headerFixes } from "../hooks/useSettings";

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

export default function Settings({ type, setType, headerFix, setHeaderFix }) {
  return (
    <Content>
      <form>
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
            getter={headerFix}
            setter={setHeaderFix}
          />
        </Content>
      </form>
    </Content>
  );
}
