import { IMeme, Meme } from "./models/meme-model";

export class MemeManager {
  async getAll(): Promise<IMeme[]> {
    return await Meme.find();
  }

  async create(data: string): Promise<void> {
    await Meme.create({ data: data });
  }

  async delete(id: number): Promise<void> {
    await Meme.deleteOne({ _id: id });
  }
}
