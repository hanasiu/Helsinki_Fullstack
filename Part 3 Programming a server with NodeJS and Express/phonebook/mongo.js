const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.set("strictQuery", false);

const url = process.env.DB_URL;

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  Number: String,
});

const Person = mongoose.model("Person", personSchema);



mongoose
  .connect(url)
  .then(() => {
    console.log("connected");

    // const person = new Person({
    //     id: Math.random()*1000000,
    //     name: process.argv[2],
    //     Number: process.argv[3]
    //   })

    //   return person.save()
    // })
    // .then(() => {
    //   console.log('person saved!')
    //   return mongoose.connection.close()
    // })

    Person.find({}).then((result) => {
      console.log("phone book:");
      result.forEach((note) => {
        console.log(note.name, note.Number);
      });
      mongoose.connection.close();
    });
  })
  .catch((err) => console.log(err));
