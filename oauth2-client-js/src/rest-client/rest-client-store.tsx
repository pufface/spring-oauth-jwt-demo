import { observable, action, computed } from 'mobx'
import { GET, POST } from './req-methods';
import { KeyValueStore } from './key-value-store'
import { ResponseStore } from './response-store'

export class RestClientStore {
  @observable name: string
  @observable method: string
  @observable url: string
  @observable readonly headers: KeyValueStore<string, string>
  @observable readonly bodyParams: KeyValueStore<string, string>
  @observable private loading: boolean
  @observable private response: ResponseStore
  @observable error: string

  static clone(client: RestClientStore): RestClientStore {
    const header = client.headers.values().reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
    const param = client.bodyParams.values().reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
    return new RestClientStore(client.name, client.url, client.method, header, param)
  }

  constructor(name: string, url?: string, method: string = GET, headers = {}, body = {}) {
    this.name = name
    this.url = url
    this.method = method
    this.headers = new KeyValueStore<string, string>()
    Object.keys(headers).forEach(key => this.headers.push(key, headers[key]))
    this.bodyParams = new KeyValueStore<string, string>()
    Object.keys(body).forEach(key => this.bodyParams.push(key, body[key]))
    this.loading = false
  }

  @action send() {
    const body = this.method != GET ? this.bodyParams.values().reduce((acc, param) => {
      if (param[0].length > 0) {
        acc.append(param[0], param[1])
      }
      return acc
    }, new FormData()) : undefined
    const headers = new Headers(this.headers.values().reduce((acc, item) => {
      acc[item[0]] = item[1]
      return acc
    }, {}))
 
    this.loading = true;
    const startTime = new Date().getTime()
    fetch(this.url, {
      method: this.method,
      headers,
      body
    }).then(response => {
      this.loading = false;
      return ResponseStore.load(response, new Date().getTime() - startTime)
    }).then(responseStore => {
      this.response = responseStore
      this.error = undefined
    }).catch(err => {
      this.loading = false
      this.response = undefined
      this.error = err + ''
      return this.error
    })
  }

  isLoading(): boolean {
    return this.loading
  }

  getResponse(): ResponseStore {
    return this.response
  }

  getError(): string {
    return this.error
  }

}