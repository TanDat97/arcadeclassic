export function authHeader() {
  // return authorization header with jwt token
  let token = (localStorage.getItem('studio/token'));
  if (token) {
      return {
          "Access-Control-Allow-Origin": "*",
          'Authorization': 'Bearer ' + token 
      };
  } else {
      return {};
  }
}