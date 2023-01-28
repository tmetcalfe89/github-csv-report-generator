import { useMemo, useState } from "react";

export const contentTypes = {
  auto: 0,
  csv: 1,
  json: 2,
};

export const headerFixes = {
  none: 0,
  snakeCase: 1,
  camelCase: 2,
  screamingSnakeCase: 3,
  kebabCase: 4,
};

function encodeSettings(type, headerFix) {
  return [type, headerFix].join("|");
}

function decodeSettings(settings) {
  if (!settings) return new Array(2).fill(0);
  const split = settings.split("|");
  return split.map((e) => +e);
}

export default function useSettings(loadedSettings) {
  const decodedSettings = decodeSettings(loadedSettings);
  const [type, setType] = useState(decodedSettings[0]);
  const [headerFix, setHeaderFix] = useState(decodedSettings[1]);

  const settingsCode = useMemo(
    () => encodeSettings(type, headerFix),
    [type, headerFix]
  );

  return {
    type,
    setType,
    headerFix,
    setHeaderFix,
    settingsCode,
  };
}
