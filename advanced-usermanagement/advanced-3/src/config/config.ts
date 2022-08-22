export default () => {
  return {
    database: {
      uri:
        process.env.TEST === 'true'
          ? process.env.TEST_DB_URI
          : process.env.DB_URI,
    },
    telegram: {
      token: process.env.TOKEN,
      sendMsgUrl: `https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`,
    },
    weatherApi: {
      key: process.env.API_KEY,
    },
  };
};
