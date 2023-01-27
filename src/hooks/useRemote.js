import { useEffect, useMemo, useState } from "react";
import csv from "csvtojson";

export const types = {
  csv: "csv",
  json: "json",
};

export const statuses = {
  waiting: "waiting",
  loaded: "loaded",
  errored: "errored",
};

function csvToJson(csvData) {
  return csv().fromString(csvData);
}

export default function useRemote(url, type) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const status = useMemo(() => {
    if (error) return statuses.errored;
    if (!data) return statuses.waiting;
    return statuses.loaded;
  }, [data, error]);

  useEffect(() => {
    let running = true;
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          const responseError = await response.text();
          if (!running) return;
          setError(responseError);
          return;
        }
        const responseData =
          type === types.json
            ? await response.json()
            : await csvToJson(await response.text());
        if (!running) return;
        setData(responseData);
      } catch (error) {
        setError(error.message);
      }
    }
    setError(null);
    setData(null);
    fetchData();

    return () => {
      running = false;
    };
  }, [type, url]);

  return { data, error, status };
}
