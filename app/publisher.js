const mqtt = require("mqtt");
const mongoose = require("mongoose");

const client = mqtt.connect("mqtt://test.mosquitto.org");
const topic = "spm/device/12345";
const device_id = topic.slice(11);

const userSchema = new mongoose.Schema({
  deviceID: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 60,
  },

  patients: {
    type: [],
  },

  containers: {
    type: [],
  },

  history: {
    type: [],
  },

  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024,
  },

  isVerified: { type: Boolean, default: false },
});

const User = mongoose.model("user", userSchema);

const uri =
  "mongodb+srv://spm-user:1234@cluster0.pps0b.mongodb.net/spmdb?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((err) => console.log("ERROR : ", err));

async function publisher() {
  try {
    var value = await User.findOne({ deviceID: device_id });

    var data = JSON.stringify(value);

    client.publish(topic, data, { retain: true }, () => {
      console.log("published message");
    });
  } catch (error) {}
}

publisher();
