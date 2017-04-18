import * as React from 'react'
import { observer } from 'mobx-react'
import { ResponseStore } from './response-store'

interface IResponseProp {
  store: ResponseStore
  custom: boolean
  className?: string
  useAccessToken?(string): void
  useRefreshToken?(string): void
}

@observer
export class Response extends React.Component<IResponseProp, any> {
  render() {
    const resp = this.props.store
    const respClass = resp && resp.ok ? 'resp-ok' : 'resp-fail'
    return !resp ? null : (
      <div className={'response ' + this.props.className}>
        <div className="row no-gutters">
            <span className="pr-4">Response: <span className="font-weight-bold">{resp.durationMS}ms</span></span>
            <span className="pr-4">Status: <span className={'font-weight-bold '+ respClass}>{resp.status}</span></span>
            <span className="pr-4 mr-auto">Content-Type: <span className="font-weight-bold">{resp.contentType}</span></span>
            { !resp.accessToken && !this.props.custom ? null :
              <span className="pr-4"><button className="form-control form-control-sm" onClick={this.useAccessToken}>Use access token</button></span>
            }
            { !resp.refreshToken && !this.props.custom ? null : 
              <span className=""><button className="form-control form-control-sm" onClick={this.useRefreshToken}>Use refresh token</button></span>
            }
        </div>
        <div className="row">
          <div className="col">
            <pre className="form-control">{resp.text}</pre>
          </div>
        </div>
      </div>
    )
  }

  useAccessToken = (e) => {
    const accessToken = this.props.store.accessToken
    this.props.useAccessToken(accessToken)
  }

  useRefreshToken = (e) => {
    const refreshToken = this.props.store.refreshToken
    this.props.useRefreshToken(refreshToken)
  }

}