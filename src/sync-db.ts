import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { FoundationService } from '../layer/nodejs/services/foundation-service';
import {
  formatErrorResponse,
  formatSuccessfulResponse
} from '/opt/nodejs/utils/format-responses';
export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    await FoundationService.connectionDB();
    await FoundationService.synchronize();
    const message = 'Db synchronized';
    return formatSuccessfulResponse({ message });
  } catch (error) {
    return formatErrorResponse(error);
  } finally {
    await FoundationService.closeDB();
  }
};
