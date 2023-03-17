const express = require("express");
const crypto = require("crypto");
const shaRouter = express.Router();

shaRouter.post("/hash", (req, res) => {
  const { text } = req.body;
  const hash = crypto.createHash("sha256").update(text).digest("hex");

  return res.json({ HashText: hash });
});

shaRouter.post("/hashcompare", (req, res) => {
  const { hashText, originalText } = req.body;
  if (
    crypto.createHash("sha256").update(originalText).digest("hex") === hashText
  ) {
    return res.json({ IsHashed: "True" });
  } else {
    return res.json({ IsHashed: "False" });
  }
});

module.exports = shaRouter;
