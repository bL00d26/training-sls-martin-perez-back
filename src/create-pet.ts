import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { PetService } from '/opt/nodejs/services/pet-service';
import {
  formatErrorResponse,
  formatSuccessfulResponse
} from '/opt/nodejs/utils/format-responses';
import { parseBody } from '/opt/nodejs/utils/parse-body';
import { saveBodyS3 } from '/opt/nodejs/utils/save-body-s3';
export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const newPet = parseBody(event);
    await saveBodyS3(event);
    await PetService.connectionDB();
    const pet = await PetService.create(newPet);
    return formatSuccessfulResponse({ pet });
  } catch (error) {
    return formatErrorResponse(error);
  } finally {
    await PetService.closeDB();
  }
};
