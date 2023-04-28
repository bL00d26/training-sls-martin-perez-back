import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { PetService } from '/opt/nodejs/services/pet-service';
import { parseBody } from '/opt/nodejs/utils/parse-body';
import { saveBodyS3 } from '/opt/nodejs/utils/save-body-s3';
export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const newPet = parseBody(event);
    await saveBodyS3(event);
    await PetService.connectionDB();
    const pet = await PetService.create(newPet);
    return { statusCode: 200, body: JSON.stringify({ pet }) };
  } catch (error) {
    throw error;
  } finally {
    await PetService.closeDB();
  }
};
