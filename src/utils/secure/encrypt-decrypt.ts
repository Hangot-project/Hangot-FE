import CryptoJS from "crypto-js";

/**
 * 토큰 암호화
 */
export function encrypt(value: string) {
  try {
    const secretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY;
    if (!secretKey) {
      return null;
    }
    return CryptoJS.AES.encrypt(value, secretKey).toString();
  } catch (error) {
    return null;
  }
}

/**
 * 값을 복호화
 */
export function decrypt(value: string) {
  try {
    const secretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY;
    if (!secretKey) {
      return null;
    }
    return CryptoJS.AES.decrypt(value, secretKey).toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return null;
  }
}
