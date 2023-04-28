export const formatSuccessfulResponse = (body: any) => {
  return {
    statusCode: 200,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
};

export const formatErrorResponse = (error: any) => {
  return {
    statusCode: 500,
    body: JSON.stringify({ error: error.message }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
};
