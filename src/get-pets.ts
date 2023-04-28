import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { PetService } from '/opt/nodejs/services/pet-service';
export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const id = Number(event.pathParameters?.foundationId);
    if (!id) {
      throw new Error('Missing id parameter');
    }
    await PetService.connectionDB();
    const pets = await PetService.findByFoundationId(id);
    return { statusCode: 200, body: JSON.stringify({ pets }) };
  } catch (error) {
    throw error;
  } finally {
    await PetService.closeDB();
  }
};
