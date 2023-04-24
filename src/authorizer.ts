import {
  APIGatewayAuthorizerEvent,
  CustomAuthorizerResult,
  APIGatewayAuthorizerHandler,
  APIGatewayTokenAuthorizerEvent
} from 'aws-lambda';

const authenticateToken = async (token: string): Promise<boolean> => {
  return token === 'test';
};

export const handler: APIGatewayAuthorizerHandler = async (
  event: APIGatewayAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  if ('type' in event && event.type !== 'TOKEN') {
    throw new Error('Invalid event type');
  }

  const tokenEvent = event as APIGatewayTokenAuthorizerEvent;
  const token = tokenEvent.authorizationToken;

  try {
    const isAuthenticated = await authenticateToken(token);

    if (!isAuthenticated) {
      throw new Error('Unauthorized');
    }

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: tokenEvent.methodArn
          }
        ]
      }
    };
  } catch (error) {
    throw new Error('Unauthorized');
  }
};
