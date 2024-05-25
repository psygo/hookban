import { TaggedHTMLElement } from "./utils/TaggedHTMLElement"

export class HookbanContainer
  extends HTMLElement
  implements TaggedHTMLElement
{
  static readonly tag = "hook-ban"

  constructor() {
    super()
  }
}
