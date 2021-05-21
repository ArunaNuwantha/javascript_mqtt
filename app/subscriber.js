const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://test.mosquitto.org");

const topic = "spm/device/12345";

client.subscribe(topic);

client.on("message", (topic, message, options) => {
  options.retain = true;
  console.log(JSON.parse(message));
});
