"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meme = void 0;
const mongoose_1 = require("mongoose");
const MemeSchema = new mongoose_1.Schema({
    data: { type: String, required: true },
});
exports.Meme = (0, mongoose_1.model)("Meme", MemeSchema);
