const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Rating = require("./rating.model");

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: "Your Pet needs a name!",
    },
    image: {
      type: String,
      required: "Image is required",
      validate: {
        validator: function (value) {
          try {
            const url = new URL(value);
            return url.protocol === "http:" || url.protocol === "https:";
          } catch (error) {
            return false;
          }
        },
        message: (props) => `Invalid image URL`,
      },
    },
    description: {
      type: String,
      required: "Description of your pet is required",
      minlength: [10, "Description needs 10 chars at least"],
    },
    species: {
      type: String,
      required: "Your pet species is required",
      enum: ["Dog", "Cat", "Bird", "Fish", "Turtle", "Hamster", "Horse"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    age: {
      type: Number,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

petSchema.virtual("ratings", {
  ref: Rating.modelName,
  localField: "_id",
  foreignField: "reference",
  options: {
    sort: { createdAt: -1 },
    limit: 10,
  },
});

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
