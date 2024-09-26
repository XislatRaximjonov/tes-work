import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API Bozor",
    description: "Ippadrom bozor",
  },
  servers: [
    {
      url: "http://localhost:4100",
    },
  ],
};

const outputFile = "./swagger-output.json";

const routes = ["../app.js"];

swaggerAutogen(outputFile, routes, doc);
