import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { PetService } from '/opt/nodejs/services/pet-service';
export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const id = Number(event.pathParameters?.petId);
    const foundationId = Number(event.queryStringParameters?.foundationId);
    if (!id) {
      throw new Error('Missing id parameter');
    }
    await PetService.connectionDB();
    const { affected = 0 } = await PetService.deleteById(id, foundationId);
    if (affected) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Pet deleted' })
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'There was no pet with that id in your foundation'
      })
    };
  } catch (error) {
    throw error;
  } finally {
    await PetService.closeDB();
  }
};
