import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { FoundationService } from '../layer/nodejs/services/foundation-service';
export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const { body } = event;
    await FoundationService.connectionDB();
    const result = await FoundationService.create(JSON.parse(body));
    return { statusCode: 200, body: JSON.stringify(result) };
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
