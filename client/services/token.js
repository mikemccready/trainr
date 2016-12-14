import jwt from 'jwt-simple';
import config from '../../config/secret';

export function decode(token) {
  const decoded = jwt.decode(token, config.secret);
  const user_id = decoded.sub;
  return user_id;
}
