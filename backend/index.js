const ethUtil = require('ethereumjs-util');
const sigUtil = require('eth-sig-util');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const express = require("express");
const cors = require('cors')

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/token", (req, res) => {
  let nonce = Math.floor(Math.random() * 1000000).toString(); // in a real life scenario we would random this after each login and fetch it from the db as well
  return res.send(nonce);
});

app.post("/auth", (req, res) => {
  const { address, signature, nonce } = req.body;
  // TODO: Validate signature by using eth tools (tip: ethereumjs-util and eth-sig-util)
  const msgBufferHex = ethUtil.bufferToHex(Buffer.from(nonce.toString(), 'utf8'));
  const recoveredAddress = sigUtil.recoverPersonalSignature({data: msgBufferHex, sig: signature});

  if (recoveredAddress !== address) {
    return res.status(401).send();
  }

  const payload = { publicAddress: recoveredAddress, nonce: nonce };
  const secret = process.env.SECRET;
  const authToken = jwt.sign(payload, secret, null);

  res.send({ jwt: authToken });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
