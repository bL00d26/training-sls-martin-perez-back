import { Handler, APIGatewayRequestAuthorizerEventV2 } from 'aws-lambda';
import { formatErrorResponse } from '/opt/nodejs/utils/format-responses';
const authenticateToken = async (token: string): Promise<boolean> => {
  return token === 'test';
};

export const handler: Handler = async (
  event: APIGatewayRequestAuthorizerEventV2
) => {
  const token = event.headers.authorization;
  try {
    const isAuthenticated = await authenticateToken(token);

    if (!isAuthenticated) {
      throw new Error('Unauthorized for use');
    }

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: event.routeArn
          }
        ]
      }
    };
  } catch (error) {
    console.log({ error });
    return formatErrorResponse(error);
  }
};
