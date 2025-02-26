export const sendResponse = (res, status, data) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify({status: res.statusCode,...data}));
};
