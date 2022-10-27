"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const meme_manager_1 = require("./meme-manager");
const cors_1 = __importDefault(require("cors"));
const setup = (app) => {
    app.use(express_1.default.json({ limit: "25mb" }));
    app.use((0, cors_1.default)());
    const memeManager = new meme_manager_1.MemeManager();
    (0, mongoose_1.connect)("mongodb://local:local@127.0.0.1:27017/", {});
    app.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        res.send("Root route is working");
    }));
    app.get("/meme", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        res.json(yield memeManager.getAll());
    }));
    app.post("/meme", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body.data) {
            res.sendStatus(400);
            res.json("Data missing");
            return;
        }
        yield memeManager.create(req.body.data || "");
        res.sendStatus(200);
    }));
    app.delete("/meme", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body.id) {
            res.sendStatus(400);
            res.json("Id missing");
            return;
        }
        yield memeManager.delete(req.body.id);
        res.sendStatus(200);
    }));
    app.listen(3000, () => {
        console.log("Server listening on port 3000");
    });
};
exports.setup = setup;
