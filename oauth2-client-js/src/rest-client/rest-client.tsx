import * as React from 'react'
import { observer } from 'mobx-react'
import { RestClientStore } from './rest-client-store'
import { Response } from './response'
import { Request } from './request'

interface IRestClientProp {
  client: RestClientStore
  duplicateClient(e): void
  removeClient?(e): void
  useAccessToken?(string): void
  useRefreshToken?(string): void
}

@observer
export class RestClient extends React.Component<IRestClientProp, any> {
  render() {
    const client = this.props.client
    const custom = !!this.props.removeClient
    return (
      <div className="client p-2">
        <div className="row no-gutters">
            <span className="h6 pr-1">{client.name}</span>
            <span className="mr-auto">
              <button className="form-control form-control-sm" onClick={this.props.duplicateClient}>Clone</button>
            </span>
             { custom ?
            <span>
              <button className="form-control form-control-sm" onClick={this.props.removeClient}>x</button>
            </span>
            : null }
        </div>
        <div className="row">
          <Request className="col" client={client} custom={custom}/>
        </div>
        <div className="row">
          <Response className="col-12" store={client.getResponse()} custom={custom} useAccessToken={this.props.useAccessToken} useRefreshToken={this.props.useRefreshToken}/>
          {client.error ? (
            <div className="col-12 resp-fail">{client.error}</div> 
          ): null}
        </div>
      </div>
    )
  }

}