import express, { Application } from "express";
import morgan from "morgan";
import routes from "routes/routes";

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/client", routes());

export default app;
