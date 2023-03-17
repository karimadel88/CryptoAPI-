const express = require("express");
const crypto = require("crypto");
const aesRouter = express.Router();
// const iv = crypto.randomBytes(16);
// console.log(iv);
const iv2 = "09267bd8f0b12e8994394f85334c7e1b";
const iv = Buffer.from(iv2, "hex");

aesRouter.get("/generate", (req, res) => {
  const aesKey = crypto.randomBytes(16).toString("hex");
  return res.json({ KEY: aesKey });
});

aesRouter.post("/encrypt", (req, res) => {
  try {
    const { key, plaintext } = req.body;

    console.log(key.length);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
    let ciphertext = cipher.update(plaintext, "utf-8", "hex");
    ciphertext += cipher.final("hex");
    return res.json({ iv: iv.toString("hex"), ciphertext });
  } catch (err) {
    return res.status(501).json({
      Err: err.message,
    });
  }
});

aesRouter.post("/decrypt", (req, res) => {
  try {
    const { key, ciphertext } = req.body;
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(key),
      Buffer.from(iv, "hex")
    );
    let plaintext = decipher.update(ciphertext, "hex", "utf8");
    plaintext += decipher.final("utf8");
    return res.json({
      plaintext,
    });
  } catch (err) {
    return res.status(502).json({
      Err: err,
    });
  }
});

module.exports = aesRouter;
