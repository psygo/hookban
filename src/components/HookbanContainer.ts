import { TaggedHTMLElement } from "./utils/exports"

export class HookbanContainer
  extends HTMLElement
  implements TaggedHTMLElement
{
  static readonly tag = "hookban-container"

  constructor() {
    super()
  }
}
