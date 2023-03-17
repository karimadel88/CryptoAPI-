const express = require("express");
const rsaRouter = require("./routes/rsa.route");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const aesRouter = require("./routes/aes.route");
const shaRouter = require("./routes/sha.route");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

// Accept json body
app.use(express.json());
// Documentations
app.use("/v1/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// RSA Router
app.use("/v1/api/rsa", rsaRouter);
// AES Router
app.use("/v1/api/aes", aesRouter);
// SHA Router
app.use("/v1/api/sha", shaRouter);
// Save into file
app.post("/v1/api/save", (req, res) => {
  const obj = req.body;
  const type = req.query.name;
  const currentDate = new Date().toISOString();
  if (type === "p") {
    const data = `Date: ${currentDate}:${JSON.stringify(obj)}\n`;
    fs.appendFileSync("public.txt", data);
  } else {
    const data = `Date: ${currentDate}:${JSON.stringify(obj)}\n`;
    fs.appendFileSync("public_and_private.txt", data);
  }
  return res.json({ done: true });
});

// Starting Server
app.listen(3000, () => console.log("Server Starting ...."));
