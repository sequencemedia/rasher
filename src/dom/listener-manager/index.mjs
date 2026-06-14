import {
  create,
  attach,
  detach
} from './listener-manager.mjs'

export default class ListenerManager {
  create = create

  attach = attach

  detach = detach
}
