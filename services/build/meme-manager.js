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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemeManager = void 0;
const meme_model_1 = require("./models/meme-model");
class MemeManager {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield meme_model_1.Meme.find();
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield meme_model_1.Meme.create({ data: data });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield meme_model_1.Meme.deleteOne({ _id: id });
        });
    }
}
exports.MemeManager = MemeManager;
