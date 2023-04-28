import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { FoundationService } from '/opt/nodejs/services/foundation-service';
import { parseBody } from '/opt/nodejs/utils/parse-body';
import { saveBodyS3 } from '/opt/nodejs/utils/save-body-s3';
export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const newFoundation = parseBody(event);
    await saveBodyS3(event);
    await FoundationService.connectionDB();
    const foundation = await FoundationService.create(newFoundation);
    return { statusCode: 200, body: JSON.stringify({ foundation }) };
  } catch (error) {
    throw error;
  } finally {
    await FoundationService.closeDB();
  }
};
