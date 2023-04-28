import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { PetService } from '/opt/nodejs/services/pet-service';
import {
  formatErrorResponse,
  formatSuccessfulResponse
} from '/opt/nodejs/utils/format-responses';
export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const id = Number(event.pathParameters?.petId);
    const foundationId = Number(event.queryStringParameters?.foundationId);
    if (!id) {
      throw new Error('Missing id parameter');
    }
    if (!foundationId) {
      throw new Error('Missing foundationId in query string');
    }
    await PetService.connectionDB();
    const pet = await PetService.findById(id, foundationId);
    return formatSuccessfulResponse({ pet });
  } catch (error) {
    return formatErrorResponse(error);
  } finally {
    await PetService.closeDB();
  }
};
