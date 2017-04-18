import { observable } from 'mobx'

export class KeyValueStore<K,V> {
  @observable private items = new Array<[K, V]>()

  values(): Array<[K, V]> {
    return this.items
  }

  set = (idx: number) => (key: K, value: V) => {
    this.items[idx] = [key, value]
  }

  push(key: K, value: V) {
    this.items.push([key, value])
  }

  delete(idx: number) {
    this.items.splice(idx, 1)
  }
}