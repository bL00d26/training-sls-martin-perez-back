import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { FoundationService } from '/opt/nodejs/services/foundation-service';
export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const { body } = event;
    const newFoundation = typeof body === 'string' ? JSON.parse(body) : body;
    await FoundationService.connectionDB();
    const foundation = await FoundationService.create(newFoundation);
    return { statusCode: 200, body: JSON.stringify({ foundation }) };
  } catch (error) {
    throw error;
  } finally {
    await FoundationService.closeDB();
  }
};
