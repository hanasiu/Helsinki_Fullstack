const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB", result.now());
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    minLength: 3,
    required: [true, "Person's name required"],
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{4}-\d{4}/.test(v); // south korea: 010-0000-0000
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
    unique: [true, "Have the same number on phonebook"],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Person", personSchema);
