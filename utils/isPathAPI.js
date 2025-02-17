import { ROUTES } from "./routes.js";

export const isPathAPI = (url) => {
  return url.startsWith(ROUTES.API_BASE);
};
