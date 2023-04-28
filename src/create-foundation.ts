import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { FoundationService } from '/opt/nodejs/services/foundation-service';
import { parseBody } from '/opt/nodejs/utils/parse-body';
import { saveBodyS3 } from '/opt/nodejs/utils/save-body-s3';
import {
  formatErrorResponse,
  formatSuccessfulResponse
} from '/opt/nodejs/utils/format-responses';
export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const newFoundation = parseBody(event);
    await saveBodyS3(event);
    await FoundationService.connectionDB();
    const foundation = await FoundationService.create(newFoundation);
    return formatSuccessfulResponse({ foundation });
  } catch (error) {
    return formatErrorResponse(error);
  } finally {
    await FoundationService.closeDB();
  }
};
