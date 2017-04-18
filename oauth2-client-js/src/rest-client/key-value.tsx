import * as React from 'react'
import { observer } from 'mobx-react'
import { RestClientStore } from './rest-client-store'
import { KeyValueStore } from './key-value-store'

interface IKeyValueProp {
  name: string,
  store: KeyValueStore<string, string>,
  className?: string
}

@observer
export class KeyValue extends React.Component<IKeyValueProp, any> {
  render() {
    const store = this.props.store
    return (
      <div className={this.props.className}>
        <div className="row no-gutters">
            <span className="pr-1">{this.props.name}</span>
            <span>
              <button className="form-control form-control-sm" onClick={this.addKeyValue}>+</button>
            </span>
        </div>
        { store.values().map(([k, v], i) => (
            <div className="row no-gutters" key={i}>
              <div className="col">
                <input className="form-control form-control-sm" placeholder="key" value={k} onChange={this.onKeyChange(i, k, v)}/>
              </div>
              <div className="col">
                <input className="form-control form-control-sm" placeholder="value" value={v} onChange={this.onValueChange(i, k, v)}/>
              </div>
              <div>
                <button className="form-control form-control-sm" onClick={this.deleteKeyValue(i)}>-</button>
              </div>
            </div>
        ))}
      </div>
    )
  }

  addKeyValue = (e) => {
    this.props.store.push('', '')
  }

  deleteKeyValue = (idx) => (e) => {
    this.props.store.delete(idx)
  }

  onKeyChange = (idx, key, value) => (e) => {
    const newKey = e.target.value
    this.props.store.set(idx)(newKey, value)
  }

  onValueChange = (idx, key, value) => (e) => {
    const newValue = e.target.value
    this.props.store.set(idx)(key, newValue)
  }
}