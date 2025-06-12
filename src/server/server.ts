import routes from "@routes/routes";
import express, { Application } from "express";
import morgan from "morgan";

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/client", routes());

export default app;
