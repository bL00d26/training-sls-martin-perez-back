import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import crypto from 'crypto';

const { BUCKET = 'training-martin-sls-dev', region = 'us-east-1' } =
  process.env;

export const getJsonFileName = () => {
  const uuid = crypto.randomUUID();
  const date = new Date().toISOString();
  return `${date}${uuid.slice(0, uuid.length / 2)}.json`;
};

export const generateBody = ({ body }: APIGatewayProxyEventV2) => {
  return typeof body === 'string' ? body : JSON.stringify(body);
};

export const saveBodyS3 = async (event: APIGatewayProxyEventV2) => {
  const s3 = new S3({
    region
  });
  const Body = generateBody(event);
  const Key = getJsonFileName();
  const params = {
    Bucket: BUCKET,
    Key,
    Body,
    ContentType: 'application/json'
  };
  return await s3.putObject(params).promise();
};
