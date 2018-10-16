import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from "react-admin";
// import decodeJwt from 'jwt-decode';

export default async (type, params) => {
  // called when the user attemps to log in
  if (type === AUTH_LOGIN) {
    // user is connected to the application
    if (params.status === 'connected') {

      const { authResponse } = params;
      const { userID, accessToken } = authResponse;

      const user = await auth(userID, accessToken);

      localStorage.setItem('userID', userID);
      localStorage.setItem('token', user.token);
      localStorage.setItem('name', user.name);
      localStorage.setItem('email', user.email);

      if (user.activePage) localStorage.setItem('activePage', user.activePage);
      if (user.accessToken) localStorage.setItem('accessToken', user.accessToken);

      return Promise.resolve();

    }
    else if (params.status === 'authorization_expired') {

    } else if (params.status === 'not_authorized') {
      // new user
      const { authResponse, name, email, picture } = params;
      const pictureUrl = picture ? picture.data.url : null;
      const { userID, accessToken } = authResponse;

      const user = await create(userID, accessToken, name, email, pictureUrl);

      localStorage.setItem('userID', userID);
      localStorage.setItem('token', user.token);
      localStorage.setItem('name', user.name);
      localStorage.setItem('email', user.email);
      if (user.activePage) localStorage.setItem('activePage', user.activePage);
      if (user.accessToken) localStorage.setItem('accessToken', user.accessToken);

      return Promise.resolve();
    }
  }

  // called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    localStorage.clear();
    return Promise.resolve();
  }

  // called when the API returns an error
  if (type === AUTH_ERROR) {
    const status = params.message.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      return Promise.reject();
    }
    return Promise.resolve();
  }

  if (type === AUTH_CHECK) {
    return window.FB.getLoginStatus(response => {
      if (response.status === 'connected') {
        if (localStorage.getItem("token") || localStorage.getItem("token") !== '') {
          return Promise.resolve();
        }
        else {
          localStorage.clear();
          return Promise.reject();
        }
      }
      else {
        localStorage.clear();
        return Promise.reject;
      }
    });
  }
  return Promise.reject("Unknown method");
};

const auth = async (userID, accessToken) => {
  const request = new Request('https://localhost:8080/users/auth', {
    method: 'POST',
    body: JSON.stringify({ userID, accessToken }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  });

  return fetch(request)
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.body);
        // return Promise.reject();
      }
      console.log("fetch first then return");
      return response.json();
    })
    .then(({ user }) => {
      return user;
    });
}

const create = async (userID, accessToken, name, email, pictureUrl) => {
  const request = new Request('https://localhost:8080/users/create', {
    method: 'POST',
    body: JSON.stringify({ userID, accessToken, name, email, pictureUrl }),
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
    });
}
