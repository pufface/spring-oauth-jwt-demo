import { observable, action } from 'mobx'
import { RestClientStore } from '../rest-client'
import { oauth2GetTokens, oauth2RefreshToken, oauth2GetResource, oaut2RevokeToken } from './oauth2-const'


export class ClientStore {
  @observable private accessToken = 'access_token'
  @observable private refreshToken = 'refresh_token'
  @observable readonly demoClients: Array<RestClientStore> = [
    oauth2GetTokens(),
    oauth2RefreshToken(this.refreshToken),
    oaut2RevokeToken(this.accessToken, this.refreshToken),
    oauth2GetResource(this.accessToken)
  ]
  @observable readonly customClients: Array<RestClientStore> = []

  @action addClient() {
    const name = `Client ${this.customClients.length}`
    this.customClients.push(new RestClientStore(name));
  }

  @action removeClient(idx: number ) {
    this.customClients.splice(idx, 1)
  }

  @action duplicateClient(client: RestClientStore) {
    const clonedClient = RestClientStore.clone(client)
    clonedClient.name= `Client ${client.name}`
    this.customClients.push(clonedClient)
  }

  @action useAccessToken(accessToken: string) {
    this.accessToken = accessToken
    this.demoClients[2] = oaut2RevokeToken(this.accessToken, this.refreshToken)
    this.demoClients[3] = oauth2GetResource(this.accessToken)
  }

  @action useRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken
    this.demoClients[1] = oauth2RefreshToken(this.refreshToken)
    this.demoClients[2] = oaut2RevokeToken(this.accessToken, this.refreshToken)
  }


}