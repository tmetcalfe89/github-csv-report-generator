const capitalize = (str) =>
  `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

export const snakeCaseToHeaderCase = (str) =>
  str.split("_").map(capitalize).join(" ");

export const camelCaseToHeaderCase = (str) =>
  str
    .replace(/([A-Z])/g, " $1")
    .split(" ")
    .map(capitalize)
    .join(" ");

export const screamingSnakeCaseToHeaderCase = snakeCaseToHeaderCase;

export const kebabCaseToHeaderCase = (str) =>
  str.split("-").map(capitalize).join(" ");
