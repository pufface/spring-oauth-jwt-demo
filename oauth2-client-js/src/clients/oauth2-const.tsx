import { RestClient, RestClientStore, POST, GET  } from '../rest-client'

export const OAUTH_URL = 'http://localhost:8081/oauth/token';
export const OAUTH_REVOKE_URL = 'http://localhost:8081/revoke';
export const RESOURCED_URL = 'http://localhost:8080/userinfo';

export const OAUTH_CLIENT_ID = 'my-trusted-client';
export const USER_READER = ['reader', 'reader'];
export const USER_WRITER = ['writer', 'writer'];

export const oauth2GetTokens = () =>
  new RestClientStore("Login, get access & refresh token", OAUTH_URL, POST, {
    Authorization: 'Basic ' + btoa(OAUTH_CLIENT_ID + ':')
  }, {
    grant_type: 'password',
    username: USER_READER[0],
    password: USER_READER[1]
  })
export const oauth2RefreshToken = (refreshToken: string) =>
  new RestClientStore("Refresh access token", OAUTH_URL, POST, {
    Authorization: 'Basic ' + btoa(OAUTH_CLIENT_ID + ':')
  }, {
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  })
export const oaut2RevokeToken = (accessToken: string, refreshToken: string) =>
  new RestClientStore("Logout, revoke refresh token", OAUTH_REVOKE_URL, POST, {
    Authorization: 'Bearer ' + accessToken
  }, {
    refresh_token: refreshToken
  })

export const oauth2GetResource = (accessToken: string) =>
  new RestClientStore("Call resource service with Access token", RESOURCED_URL, GET, {
    Authorization: 'Bearer ' + accessToken
  })
