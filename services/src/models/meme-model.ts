import { Document, model, Schema } from "mongoose";

export interface IMeme extends Document {
  data: string;
}

const MemeSchema: Schema = new Schema<IMeme>({
  data: { type: String, required: true },
});

export const Meme = model<IMeme>("Meme", MemeSchema);
