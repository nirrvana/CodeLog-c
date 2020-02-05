export const SIGN_IN = 'SIGN_IN';

export function signin(token) {
  return {
    type: SIGN_IN,
    token
  }
}
