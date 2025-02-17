import { requestLogger } from "./requestLogger.js";
import { routeHandler } from "./routeHandler.js";

// HANDLES THE REQUESTS
export const middlwareHandler = (req, res) => {
  const middlewareArr = [requestLogger, routeHandler]; // TRACKS THE ORDER OF OPERATION : request logging -> route handling
  let index = 0;

  const next = () => {
    if (index < middlewareArr.length) {
      const middleware = middlewareArr[index++];
      middleware(req, res, next);
    }
  };

  next();
};
