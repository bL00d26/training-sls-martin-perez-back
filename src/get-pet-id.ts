import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { PetService } from '/opt/nodejs/services/pet-service';
export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const id = event.pathParameters?.petId;
    const foundationId = event.queryStringParameters?.foundationId;
    if (!id) {
      throw new Error('Missing id parameter');
    }
    if (!foundationId) {
      throw new Error('Missing foundationId in query string');
    }
    await PetService.connectionDB();
    const pet = await PetService.findById(Number(id), Number(foundationId));
    return { statusCode: 200, body: JSON.stringify({ pet }) };
  } catch (error) {
    throw error;
  } finally {
    await PetService.closeDB();
  }
};
