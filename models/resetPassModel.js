const mongoose = require("mongoose");
const schema = mongoose.Schema;

const resetPassSchema = new schema(
  {
    token: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

resetPassSchema.index({ createdAt: 1 }, { expireAfterSeconds: "1m" });
module.exports = mongoose.model("ResetPass", resetPassSchema);
