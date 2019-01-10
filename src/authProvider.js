import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from "react-admin";
import { fbGetLoginStatus, fbLogout } from './util';
import decodeJwt from 'jwt-decode';

export default async (type, params) => {
  // called when the user attemps to log in
  if (type === AUTH_LOGIN) {
    console.log('AUTHProvider');
    console.log(localStorage, params);
    if (localStorage.getItem('token')) {
      return Promise.resolve();
    }
    else {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const { code, redirect_uri } = params;
      if (code) {
        const user = await oauth_code(code, redirect_uri);
        console.log('oauth_code:', user);
        if (user.token) {
          const decodedToken = decodeJwt(user.token);
          localStorage.setItem('role', decodedToken.role);
          localStorage.setItem('token', user.token);
          localStorage.setItem('userID', user.userID);
          localStorage.setItem('name', user.name);
          localStorage.setItem('email', user.email);
          if (user.accessToken) localStorage.setItem('accessToken', user.accessToken);
          if (user.activePage) localStorage.setItem('activePage', user.activePage);
        }

        return Promise.resolve();

      } else {

        const { authResponse } = params;
        const { userID, accessToken } = authResponse;

        const user = await auth(userID, accessToken);

        if (user.token) {
          const decodedToken = decodeJwt(user.token);
          localStorage.setItem('role', decodedToken.role);
          localStorage.setItem('token', user.token);
          localStorage.setItem('userID', userID);
          localStorage.setItem('name', user.name);
          localStorage.setItem('email', user.email);
          if (user.accessToken) localStorage.setItem('accessToken', user.accessToken);
          if (user.activePage) localStorage.setItem('activePage', user.activePage);
        }

        return Promise.resolve();
      }
    }
  }

  // called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    // await setfbAsyncInit();
    const loginStatusResp = await fbGetLoginStatus();

    if (loginStatusResp && loginStatusResp.status === 'connected') {
      await fbLogout();
      localStorage.clear();
    }
    return Promise.resolve();
  }

  // called when the API returns an error
  if (type === AUTH_ERROR) {
    const status = params.message.status;
    if (status === 401 || status === 403) {
      localStorage.clear();
      return Promise.reject();
    }
    return Promise.resolve();
  }

  if (type === AUTH_CHECK) {
    const response = await fbGetLoginStatus();
    console.log('AUTH_CHECK fbGetLoginStatus');
    console.log(response);

    if (response.status === 'connected') {
      if (localStorage.getItem('token')) {
        return Promise.resolve();
      }
      else {
        localStorage.clear();
        return Promise.reject("pos.auth.no_token");
      }
    }
    else {
      localStorage.clear();
      return Promise.reject("pos.auth.login_facebook");
    }
  }

  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem('role');
    return role ? Promise.resolve(role) : Promise.reject();
  }

  return Promise.reject("Unknown method: " + type);
};

const auth = async (userID, accessToken) => {
  const request = new Request(process.env.REACT_APP_API_URL + '/users/auth', {
    method: 'POST',
    body: JSON.stringify({ userID, accessToken }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  });

  return fetch(request)
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.body);
      }
      return response.json();
    })
    .then(({ user }) => {
      return user;
    })
    .catch((err) => {
      if (err.message)
        return Promise.reject(err.message);
      else return Promise.reject("UNKNOWN ERROR!");
    });
}

const oauth_code = async (code, redirect_uri) => {
  const request = new Request(process.env.REACT_APP_API_URL + '/users/code', {
    method: 'POST',
    body: JSON.stringify({ code, redirect_uri }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  });

  return fetch(request)
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.body);
      }
      return response.json();
    })
    .then(({ user }) => {
      return user;
    })
    .catch((err) => {
      if (err.message)
        return Promise.reject(err.message);
      else return Promise.reject("UNKNOWN ERROR!");
    });
}

