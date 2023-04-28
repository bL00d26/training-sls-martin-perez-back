import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { SNS } from 'aws-sdk';
import { ObjectLiteral } from '/opt/nodejs/node_modules/typeorm';
import { PetService } from '/opt/nodejs/services/pet-service';
import { parseBody } from '/opt/nodejs/utils/parse-body';
import { saveBodyS3 } from '/opt/nodejs/utils/save-body-s3';

const {
  SNS_TOPIC_ARN = 'arn:aws:sns:us-east-1:175749225105:SnsStack-PetHappyTopic12AD2A18-UzhOtf5YPRHo',
  REGION = 'us-east-1'
} = process.env;

export const formatPetAdoptionMessage = (pet: ObjectLiteral) =>
  `${pet.name} was adopted!`;

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
    await saveBodyS3(event);
    await PetService.connectionDB();
    const updateParameters = parseBody(event);
    const pet = await PetService.update(
      { id: Number(id), foundationId: Number(foundationId) },
      updateParameters
    );
    if (!pet) {
      throw new Error('Pet not found');
    }
    const { status = '' } = updateParameters;
    if (status === 'happy') {
      const sns = new SNS({
        region: REGION
      });
      await sns
        .publish({
          TopicArn: SNS_TOPIC_ARN,
          Message: JSON.stringify(formatPetAdoptionMessage(pet))
        })
        .promise();
    }
    return { statusCode: 200, body: JSON.stringify({ pet }) };
  } catch (error) {
    throw error;
  } finally {
    await PetService.closeDB();
  }
};
