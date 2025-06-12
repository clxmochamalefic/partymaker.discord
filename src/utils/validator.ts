const isNullOrWhitespace = (x: unknown) => x === null || x === undefined || (typeof x === "string" && x === "");

export { isNullOrWhitespace }
