import * as React from 'react'

export const GET = 'GET'
export const POST = 'POST'
export const PUT = 'PUT'
export const DELETE = 'DELETE'
export const REST_METHODS = [GET, POST, PUT, DELETE];

interface IReqMethodProp {
  value: string
  onChange(e): void
  className?: string
}

export class ReqMethods extends React.Component<IReqMethodProp, any> {

  render() {
    return (
      <select className={this.props.className} value={this.props.value} onChange={this.props.onChange}>
        {REST_METHODS.map(method =>
          <option key={method} value={method}>
            {method}
          </option>
        )}
      </select>
    );
  }
}