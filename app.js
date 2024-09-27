import express from "express";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import { commentsRouter } from "./routes/commentsRoutes.js";

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to bozor");
});

app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);

app.use("/comments", commentsRouter);

app.all("*", (req, res) => {
return  res.status(200).json( {
  status: "fail",
  message: `Can't find ${req.originalUrl} on this server`,  // This will change based on the specific error you want to return
 });
})

export default app;
