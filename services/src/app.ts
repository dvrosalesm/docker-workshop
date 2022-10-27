import express, { Application } from "express";
import { setup } from "./setup";

const app: Application = express();
setup(app);
