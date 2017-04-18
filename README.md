# Spring Boot OAuth2 with JWT Demo

Minimal application for demonstrate spring boot Oauth2 security with JWT token and logout like functionality.

Authentication idea:
1. Login with username + password, obtain access and refesh tokens [Client -> Authorization server]
2. Using resource with access token [Client -> Resource server]
3. Renew access token with refreh token when expired [Client -> Authorization server]
4. Revoke refresh token, when logout is need (access token remains still valid until expired) [Client -> Authorization server]

Implementaion notes:
1. Separete authentication and resource server
2. Using standard implementation (only Spring, no custom solutions)
3. Keeping minimal configuration

## OAuth2 Authorization  Server
Authorization server is based on password credentials flow, where user provides username and password. Access and refresh token are in JWT format. Server contains in memory store for tokens, which enables revoke refresh token.

API: /oauth/token (grant_type:password)
Provides access and refresh token by user credentials.

API: /oauth/token (grant_type:refesh_token)
Returns new access and refresh token by valid refresh token. Old refresh token is invalided.

API: /revoke
Revoke refresh token from store, so refresh token cannot be used anymore. To obtain new access token after revoking is necessary generate new one.

CLIENT_ID: my-trusted-client

USERS: "username/password [ROLES]"
reader/reader [READER]
writer/writer [READER, WRITER]

PREREQUISITS:
* JDK 8
* Gradle 3.4

RUN SERVER: `gradle bootRun`

ECLIPSE PROJECT: `gradle eclipse`

## OAuth2 Resource Server
Simple stateless resource server with authentication by JWT token only.

API: /userinfo
Returns user name and roles obtained from token.

PREREQUISITS:
* JDK 8
* Gradle 3.4

RUN SERVER: `gradle bootRun`

ECLIPSE PROJECT: `gradle eclipse`

## OAuth2 client JS
Simplified rest clients for testing oauth password flow and API in general. Contains predefined requests for using with OAuth2 Authorization Server and OAuth2 Resource Server.

PREREQUISITS:
* Node 6.10
* Npm 4.3.0

RUN CLIENT: `npm start`
