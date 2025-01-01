export const createResponse = (
  success: boolean,
  data: any,
  message?: string,
) => {
  return { success, data, message };
};
