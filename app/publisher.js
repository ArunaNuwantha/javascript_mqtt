const mqtt = require("mqtt");
const mongoose = require("mongoose");
const { User } = require("./user");

const client = mqtt.connect("mqtt://test.mosquitto.org");
const topic = "spm/device/12345";
const device_id = topic.slice(11);

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

setInterval(() => {
  publisher();
}, 5000);

// fetchDataFromMongoDB();
