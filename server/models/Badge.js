const { Schema } = require("mongoose");

const badgeSchema = new Schema(
  {
    badge: {type: Number}
  }
)

const Badge = model("Badge", badgeSchema);

module.exports = Badge;