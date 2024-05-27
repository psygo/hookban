import { TaggedHTMLElement } from "./utils/exports"

export class HookbanGid
  extends HTMLElement
  implements TaggedHTMLElement
{
  static readonly tag = "hookban-grid"

  connectedCallback() {}
}
