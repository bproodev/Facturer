// src/utils/jwt.js
import { jwtDecode } from 'jwt-decode';

export function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}
