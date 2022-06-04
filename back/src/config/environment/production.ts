export default {
  port: 4002,

  url: {
    scheme: 'http',
    host: 'plants.ge',
    api: 'plants.ge',
  },

  mongo: {
    uri: `mongodb://localhost:27017/plants`,
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
    },
  },

  resourceUrl: 'http://plants.ge',

  winstonConsole: false,

  // seedDB: true,
};
