import * as React from 'react'
import { observer } from 'mobx-react'
import { ResponseStore } from './response-store'
import { RestClientStore } from './rest-client-store'
import { ReqMethods } from './req-methods'
import { KeyValue } from './key-value'

interface IRequestProp {
  client: RestClientStore
  custom: boolean
  className?: string
}

@observer
export class Request extends React.Component<IRequestProp, any> {
  render() {
    const client = this.props.client
    return (
      <div className={'request ' + this.props.className}>
        <div className="row no-gutters">
          <div>
            <ReqMethods className="form-control form-control-sm" value={client.method} onChange={this.onMethodChange}/>
          </div>
          <div className="col">
            <input className="form-control form-control-sm" placeholder="url" value={client.url} onChange={this.onUrlChange}/>
          </div>
          <div>
            <button className="form-control form-control-sm" disabled={client.isLoading()} onClick={this.send}>
              {client.isLoading()?'Loading...':'Send'}
            </button>
          </div>
        </div>
        <div className="row pt-1">
          <KeyValue className="col-sm" name="Headers" store={client.headers}/>
          <KeyValue className="col-sm" name="Body Params" store={client.bodyParams}/>
        </div>
      </div>
    )
  }

  onMethodChange = (e) => {
    const method = e.target.value
    this.props.client.method = method
  }

  onUrlChange = (e) => {
    const url = e.target.value
    this.props.client.url = url
  }

  send = (e) => {
    e.preventDefault()
    this.props.client.send()
  }
}