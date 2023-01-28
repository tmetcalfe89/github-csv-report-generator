import csv from "csvtojson";

export const parseCsv = (text) => csv().fromString(text);

export const parseJson = (text) => JSON.parse(text);

export function parseAuto(text) {
  try {
    return parseJson(text);
  } catch (error) {
    return parseCsv(text);
  }
}
