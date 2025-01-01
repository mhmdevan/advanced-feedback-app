export const paginate = (data: any[], page: number, pageSize: number) => {
  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  return data.slice(start, end);
};
