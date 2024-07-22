/* hash string */
import sha256 from 'crypto-js/sha256'

export const hashStr = (str: string) => {
  return sha256(str).toString()
};
