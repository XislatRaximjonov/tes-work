import express from "express"
import categoriesRoutes from "./routes/categoriesRoutes.js"
import productsRoutes from "./routes/productsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";


const app = express();


const __filname = fileUrlToPath(import.meta.url);
const __dirname = path.dirname(__filname);




const options = {
definition: {
    openapi: "3.0.0",
    info: {
    title:"Ipadrom" ,
    version: "1.0.0",
    },
    servers: [{url: "http://localhost:10000"}]
    },
    apis: [`${join(__dirname , "routes", "*.js")}`],
}

const swaggerSpec = swaggerJSDoc(options)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.use(express.json())
app.get("/" , (req, res) => {
res.send("Welcome to bozor")
});

app.use("/categories", categoriesRoutes)
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);


export default app;


