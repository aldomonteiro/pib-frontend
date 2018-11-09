import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from "react-admin";
import { setfbAsyncInit, fbEnsureInit, fbGetLoginStatus, fbLogout } from './util';
import decodeJwt from 'jwt-decode';

export default async (type, params) => {
  // called when the user attemps to log in
  if (type === AUTH_LOGIN) {
    console.log("AUTH_LOGIN.. ", params);
    const { authResponse, name, email, picture, location } = params;
    const locationName = location ? location.name : null;
    const pictureUrl = picture ? picture.data.url : null;
    const { userID, accessToken } = authResponse;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const user = await auth(userID, accessToken, name, email, pictureUrl, timeZone, locationName);

    if (user.token) {
      const decodedToken = decodeJwt(user.token);
      localStorage.setItem('role', decodedToken.role);

      localStorage.setItem('token', user.token);
      localStorage.setItem('userID', userID);
      localStorage.setItem('name', user.name);
      localStorage.setItem('email', user.email);
      if (user.activePage) localStorage.setItem('activePage', user.activePage);
      if (user.accessToken) localStorage.setItem('accessToken', user.accessToken);

      return Promise.resolve();
    }
    // }
    return Promise.reject()
  }

  // called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    // console.log("AUTH_LOGOUT ...");
    // await setfbAsyncInit();
    const loginStatusResp = await fbGetLoginStatus();

    if (loginStatusResp && loginStatusResp.status === 'connected') {
      const loginStatusLogout = await fbLogout();
      // console.log("FB.logout:", loginStatusLogout);
      localStorage.clear();
    }
    // console.log("resolved logout promise");
    return Promise.resolve();
  }

  // called when the API returns an error
  if (type === AUTH_ERROR) {
    const status = params.message.status;

    console.log("AUTH_ERROR");

    if (status === 401 || status === 403) {
      localStorage.clear();
      return Promise.reject();
    }
    return Promise.reject();
  }

  if (type === AUTH_CHECK) {
    const response = await fbGetLoginStatus();

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

const auth = async (userID, accessToken, name, email, pictureUrl, timeZone, locationName) => {
  const request = new Request(process.env.REACT_APP_API_URL + '/users/auth', {
    method: 'POST',
    body: JSON.stringify({ userID, accessToken, name, email, pictureUrl, timeZone, locationName }),
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
