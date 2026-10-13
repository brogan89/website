// Prefixes a /public path with the basePath, which plain <img>/<video> srcs don't get automatically.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
