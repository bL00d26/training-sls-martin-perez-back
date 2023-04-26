import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { PetService } from '/opt/nodejs/services/pet-service';
export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const { body } = event;
    const newPet = typeof body === 'string' ? JSON.parse(body) : body;
    await PetService.connectionDB();
    const pet = await PetService.create(newPet);
    return { statusCode: 200, body: JSON.stringify({ pet }) };
  } catch (error) {
    throw error;
  } finally {
    await PetService.closeDB();
  }
};
