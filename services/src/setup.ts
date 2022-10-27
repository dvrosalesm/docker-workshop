import express, { Application, Request, Response, NextFunction } from "express";
import { connect } from "mongoose";
import { MemeManager } from "./meme-manager";
import cors from "cors";
import * as dotenv from "dotenv";

export const setup = (app: Application) => {
  dotenv.config();
  app.use(express.json({ limit: "25mb" }));
  app.use(cors());

  const memeManager = new MemeManager();
  connect(
    `mongodb://${process.env.mongo_username}:${process.env.password}@${process.env.mongo_ip}/`,
    {}
  );

  app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    res.send("Root route is working");
  });

  app.get("/meme", async (req: Request, res: Response, next: NextFunction) => {
    res.json(await memeManager.getAll());
  });

  app.post("/meme", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.data) {
      res.sendStatus(400);
      res.json("Data missing");
      return;
    }

    await memeManager.create((req.body.data as string) || "");
    res.sendStatus(200);
  });

  app.delete(
    "/meme",
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.body.id) {
        res.sendStatus(400);
        res.json("Id missing");
        return;
      }

      await memeManager.delete(req.body.id);
      res.sendStatus(200);
    }
  );

  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
};
