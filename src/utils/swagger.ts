import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs for clinic",
            version,
        },
        // components: {
        //     securitySchemes: {
        //         bearerAuth: {
        //             type: "http",
        //             scheme: "bearer",
        //             bearerFormat: "JWT",
        //         },
        //     },
        // },
        // security: [
        //     {
        //         bearerAuth: [],
        //     },
        // ],
    },
    apis: ["./src/api/*.ts", "./src/validation/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express,) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

}

export default swaggerDocs;