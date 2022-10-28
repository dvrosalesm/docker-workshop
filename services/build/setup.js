"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
const setup = (app) => {
    dotenv.config();
    app.use(express_1.default.json({ limit: "25mb" }));
    app.use((0, cors_1.default)());
    app.options("*", (0, cors_1.default)());
    const memeManager = new meme_manager_1.MemeManager();
    (0, mongoose_1.connect)("mongodb://local:local@127.0.0.1:27017/");
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
