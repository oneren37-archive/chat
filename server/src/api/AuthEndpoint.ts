import * as jwt from 'jsonwebtoken';

export function AuthEndpoint(req, res): void {
  const token = req.cookies.jwt;
  // TODO добавить нормальную проверку на валидность токена
  if (!token || !jwt.verify(token, 'MySuP3R_z3kr3t')) res.status(200).send(false);
  else res.status(200).send(true);
}
