import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { PetService } from '/opt/nodejs/services/pet-service';
import { parseBody } from '/opt/nodejs/utils/parse-body';
import { saveBodyS3 } from '/opt/nodejs/utils/save-body-s3';
export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const foundationId = Number(event.pathParameters?.foundationId);
    if (!foundationId) {
      throw new Error('Missing id parameter');
    }
    await saveBodyS3(event);
    await PetService.connectionDB();
    const filterParameters = parseBody(event);
    const data = {
      ...filterParameters,
      foundationId
    };
    const pets = await PetService.filterPets(data);
    return { statusCode: 200, body: JSON.stringify({ pets }) };
  } catch (error) {
    throw error;
  } finally {
    await PetService.closeDB();
  }
};
