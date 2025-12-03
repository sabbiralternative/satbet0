import CryptoJS from "crypto-js";
/* handle decrypt data. Which we are not using in this project but you  need it */
const handleDecryptData = (data) => {
  const CryptoJSAesJson = {
    stringify: function (cipherParams) {
      var j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
      if (cipherParams.iv) j.iv = cipherParams.iv.toString();
      if (cipherParams.salt) j.s = cipherParams.salt.toString();
      return JSON.stringify(j);
    },
    parse: function (jsonStr) {
      var j = JSON.parse(jsonStr);
      var cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(j.ct),
      });
      if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
      if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
      return cipherParams;
    },
  };
  const decrypted = JSON.parse(
    CryptoJS.AES.decrypt(
      data,
      'vRpjunXa0Y5fHNsZbmGnvKGLWADa7HGymaQnZxAk5fyzOgwMgGmAu7cRxsilGx9E',
      { format: CryptoJSAesJson }
    ).toString(CryptoJS.enc.Utf8)
  );

  return JSON.parse(decrypted);
};

export default handleDecryptData;
