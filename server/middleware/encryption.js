import Crypto from "crypto";
import Assert from "assert";
import dotenv from "dotenv";
dotenv.config();

const algorithm = process.env.ALGORITHM; // or any other algorithm supported by OpenSSL
const key = process.env.KEY;


export function encodeStr(text, k = key) {
  var key1 = Buffer.from(k.substring(0, 8), "utf8");
  var iv = Buffer.from(k.substring(0, 8), "utf8");
  var cipher = Crypto.createCipheriv(algorithm, key1, iv);
  var c = cipher.update(text, "utf8", "base64");
  c += cipher.final("base64");
  return c;
}

export function decodeStr(eText, k = key) {
  try {
    var key1 = Buffer.from(k.substring(0, 8), "utf8");
    var iv = Buffer.from(k.substring(0, 8), "utf8");
    var cipher = Crypto.createDecipheriv(algorithm, key1, iv);
    var c = cipher.update(eText, "base64", "utf8");
    c += cipher.final("utf8");
    return c;
  } catch {
    return "";
  }
}

// const decrypt = (text) => Assert.equal(decrypted, text);

// export{encrypted, decrypted}
