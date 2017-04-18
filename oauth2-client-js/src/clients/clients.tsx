import * as React from 'react'
import { observable, action, autorun } from 'mobx'
import { observer, Provider } from 'mobx-react'
import { RestClient } from '../rest-client/rest-client'
import { RestClientStore } from '../rest-client'
import { ClientStore } from "./clients-store"

const clients = new ClientStore()

@observer
export class Clients extends React.Component<{}, {}> {

  render() {
    return (
        <div>
          { clients.demoClients.map((c,i) => <RestClient key={'d'+i} client={c} useAccessToken={this.useAccessToken} useRefreshToken={this.useRefreshToken} duplicateClient={this.duplicateClient(c)}/>) }
          { clients.customClients.map((c,i) => <RestClient key={'c'+i} client={c} removeClient={this.removeClient(i)} duplicateClient={this.duplicateClient(c)}/>) }
          <button className="btn btn-secondary mt-1" onClick={this.addClient}>Add</button>
        </div>
    );
  }

  addClient = (e) => {
    clients.addClient()
  }

  duplicateClient = (client: RestClientStore) => (e) => {
    clients.duplicateClient(client)
  }

  removeClient = (idx: number) => (e) => {
    clients.removeClient(idx);
  }

  useAccessToken = (accessToken: string) => {
    clients.useAccessToken(accessToken)
  }

  useRefreshToken = (refreshToken: string) => {
    clients.useRefreshToken(refreshToken)
  }

}
