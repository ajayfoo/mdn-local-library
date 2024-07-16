import mongoose from "mongoose";
import { DateTime } from "luxon";

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "";
});

const formatDate = (date) => {
  return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED);
};

AuthorSchema.virtual("lifespan").get(function () {
  const dateOfDeath = this.date_of_death
    ? formatDate(this.date_of_death)
    : "Present";
  return formatDate(this.date_of_birth) + " - " + dateOfDeath;
});

export default mongoose.model("Author", AuthorSchema);
