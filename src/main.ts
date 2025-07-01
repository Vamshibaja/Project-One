import express, { Application, Request, Response, NextFunction } from "express";
import DBConnection from "./config/mongoConnection.config";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { logRequests } from "./middlewares/requestLogger.middleware";
dotenv.config();

class Main {
  private readonly app: Application;
  private readonly PORT: number;
  public constructor() {
    const port = process.env.PORT;
    this.PORT = port ? parseInt(port, 10) : 4000;
    this.app = express();
  }
  intializeMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(logRequests);
  }
  intializeRoutes() {
    this.app.get("/", (req: Request, res: Response, next: NextFunction) => {
      res.send({ msg: "Hi Vamshi Baja 👋👋👋" });
    });
  }
  errorHandler() {
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error("🔥 Error:", err.message);
      res.status(err.status ?? 500).json({
        success: false,
        error: err.message ?? "Internal server error",
      });
    });
  }
  async start() {
    this.intializeMiddleware();
    await DBConnection.connect();
    this.intializeRoutes();
    this.errorHandler();
    this.app.listen(this.PORT, () => {
      console.log(`🚀 Server Started on Port ${this.PORT}`);
    });
  }
}
(async () => {
  const server = new Main();
  await server.start();
})();
