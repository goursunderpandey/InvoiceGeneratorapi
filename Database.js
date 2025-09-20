const mongoose = require("mongoose")
const URL = "mongodb+srv://sunderpandey53:sunder@cluster0.6avrmw1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const databse = {
  connect: async () => {
    await mongoose.connect(URL, {
    });
    console.log('Connected to MongoDB');
  },

  disconnect: async () => {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  },
};

module.exports = databse;