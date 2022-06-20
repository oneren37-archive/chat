const bcrypt = require('bcrypt');

export function cryptPassword(password) {
  return new Promise<string>((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
}

export function comparePassword(plainPass, hash) {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(plainPass, hash, (err, isPasswordMatch) => {
      if (err) reject(err);
      else resolve(isPasswordMatch);
    });
  });
}
