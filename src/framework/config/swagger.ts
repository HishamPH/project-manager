import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Define swagger options
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "This is the API documentation for my app",
  },
  components: {
    securitySchemes: {
      CookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "accessToken",
      },
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/controller/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
