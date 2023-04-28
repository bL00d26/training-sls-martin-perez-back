import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { PetService } from '/opt/nodejs/services/pet-service';
import {
  formatErrorResponse,
  formatSuccessfulResponse
} from '/opt/nodejs/utils/format-responses';
export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const id = Number(event.pathParameters?.foundationId);
    if (!id) {
      throw new Error('Missing id parameter');
    }
    await PetService.connectionDB();
    const pets = await PetService.findByFoundationId(id);
    return formatSuccessfulResponse({ pets });
  } catch (error) {
    return formatErrorResponse(error);
  } finally {
    await PetService.closeDB();
  }
};
