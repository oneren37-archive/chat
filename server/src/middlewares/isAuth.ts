import * as jwt from 'jsonwebtoken';

export default (req, res, next): void => {
  const token = req.cookies.jwt;
  // TODO добавить нормальную проверку на валидность токена
  if (!token || !jwt.verify(token, 'MySuP3R_z3kr3t')) {
    res.redirect('/sign-in');
  } else next();
};
