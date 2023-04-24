import { randomUUID } from 'node:crypto'

export abstract class Entity<Props> {
  protected _id: string
  protected props: Props

  protected constructor(props: Props, id?: string) {
    this.props = props
    this._id = id ?? randomUUID()
  }

  get id() {
    return this._id
  }
}
