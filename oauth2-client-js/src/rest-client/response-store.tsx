import { observable } from 'mobx'

export const CONTENT_TYPE = 'content-type'

export class ResponseStore {
  @observable readonly status: number
  @observable readonly durationMS: number
  @observable readonly text: string
  @observable readonly contentType: string
  @observable readonly ok: boolean
  @observable readonly json?: any
  @observable readonly accessToken: string
  @observable readonly refreshToken?: string

  static load(response: Response, durationMS: number): Promise<ResponseStore> {
    console.log(response)
    let resp = {
      status: response.status,
      durationMS,
      contentType: response.headers.get(CONTENT_TYPE),
      ok: response.ok,
      text: undefined,
      json: undefined,
      accessToken: undefined,
      refreshToken: undefined
    }
    return Promise.resolve(response.text())
      .then((text:string) => {
        Object.assign(resp, {text})
        try {
          const json = JSON.parse(text)
          const structText = JSON.stringify(JSON.parse(text), null, 2)
          Object.assign(resp, {
            json,
            text: structText,
            accessToken: json.access_token,
            refreshToken: json.refresh_token
          })
        } finally {
          return resp
        }
      })
  }

}