import * as React from 'react'
import { Provider } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import { Clients } from '../clients'

export class App extends React.Component<undefined, undefined> {

  render() {
    return (
      <div className="container-fluid">
        <h1>OAuth2 Client Demo Playground</h1>
        <Clients />
        <DevTools />
      </div>
    )
  }
}