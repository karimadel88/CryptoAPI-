const express = require("express");
const crypto = require("crypto");
const rsaRouter = express.Router();

rsaRouter.post("/encrypt", (req, res) => {
  try {
    const { plaintext, publicKey } = req.body;
    console.log(publicKey);

    const ciphertext = crypto
      .publicEncrypt(
        {
          key: publicKey,
        },
        Buffer.from(plaintext)
      )
      .toString("base64");
    return res.json({
      CipherText: ciphertext,
    });
  } catch (err) {
    console.log(err);
    return res.status(501).json({
      ERR: err.message,
    });
  }
});

rsaRouter.get("/public_private_key", (req, res) => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });
  return res.json({
    publicKey,
    privateKey,
  });
});

rsaRouter.post("/decrypt", (req, res) => {
  try {
    const { cipherText, privateKey } = req.body;
    const plaintext = crypto
      .privateDecrypt(
        {
          key: privateKey,
        },
        Buffer.from(cipherText, "base64")
      )
      .toString();
    return res.json({
      plaintext,
    });
  } catch (err) {
    return res.status(501).json({
      Err: err.message,
    });
  }
});

module.exports = rsaRouter;
