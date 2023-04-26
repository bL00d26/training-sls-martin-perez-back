import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { PetService } from '/opt/nodejs/services/pet-service';
export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const id = event.pathParameters?.foundationId;
    const { body } = event;
    if (!id) {
      throw new Error('Missing id parameter');
    }
    await PetService.connectionDB();
    const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
    const data = {
      ...parsedBody,
      foundationId: Number(id)
    };
    const pets = await PetService.filterPets(data);
    return { statusCode: 200, body: JSON.stringify({ pets }) };
  } catch (error) {
    throw error;
  } finally {
    await PetService.closeDB();
  }
};
