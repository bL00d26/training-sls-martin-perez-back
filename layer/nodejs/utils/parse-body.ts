export const parseBody = (event) => {
  const { body } = event;
  return typeof body === 'string' ? JSON.parse(body) : body;
};
