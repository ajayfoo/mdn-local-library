import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, required: true, min: 3, max: 100 },
});

GenreSchema.virtual("url").get(function () {
  return `/catalog/genre/${this._id}`;
});

export default mongoose.model("Genre", GenreSchema);
