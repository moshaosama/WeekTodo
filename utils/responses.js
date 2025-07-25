export const successResponse = (res, message, data) => {
  return res.status(200).json({
    statusbar: "success",
    message,
    data,
  });
};

export const errorResponse = (res, status, message) => {
  return res.status(status).json({
    statusbar: "error",
    message,
  });
};
