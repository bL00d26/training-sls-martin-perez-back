import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { FoundationService } from '../layer/nodejs/services/foundation-service';
export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    await FoundationService.connectionDB();
    await FoundationService.synchronize();
    const message = 'Db synchronized';
    return { statusCode: 200, body: JSON.stringify(message) };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  } finally {
    await FoundationService.closeDB();
  }
};
