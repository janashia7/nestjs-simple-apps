export default () => {
  return {
    database: {
      uri:
        process.env.TEST === 'true'
          ? process.env.TEST_DB_URL
          : process.env.DB_URL,
    },
    aws: {
      services: {
        sqs: { queueUrl: process.env.QUEUE_URL },
        s3: { bucketUrl: process.env.S3_BUCKET_URL },
      },
      config: {
        defaultServiceOptions: {
          region: process.env.REGION,
          credentials: {
            accessKeyId: process.env.AWS_ID,
            secretAccessKey: process.env.AWS_SECRET,
          },
        },
      },
    },
  };
};
