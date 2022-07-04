const bcrypt = require('bcrypt');

export function cryptPassword(password) {
  return new Promise<string>((resolve) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw err;
      else resolve(hash);
    });
  });
}

export function comparePassword(plainPass, hash) {
  return new Promise<boolean>((resolve) => {
    bcrypt.compare(plainPass, hash, (err, isPasswordMatch) => {
      if (err) throw err;
      else resolve(isPasswordMatch);
    });
  });
}
