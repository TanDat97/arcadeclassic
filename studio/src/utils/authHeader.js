export function authHeader() {
  // return authorization header with jwt token
  let token = JSON.parse(localStorage.getItem('studio/token'));
  if (token) {
      return {
          "Access-Control-Allow-Origin": "*",
          'authorization': 'Bearer ' + token 
      };
  } else {
      return {};
  }
}