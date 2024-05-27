import { TaggedHTMLElement } from "./utils/exports"

export class HookbanStones
  extends HTMLElement
  implements TaggedHTMLElement
{
  static readonly tag = "hookban-stones"

  private canvas = document.createElement("canvas")

  static readonly observedAttributes = ["width", "height"]

  constructor(public width = 100, public height = 100) {
    super()
  }

  connectedCallback() {
    this.setAttribute("width", this.width.toString())
    this.setAttribute("height", this.height.toString())

    const shadowRoot = this.attachShadow({ mode: "open" })
    shadowRoot.appendChild(this.canvas)
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    switch (name) {
      case "width":
        this.width = parseFloat(newValue)
        break
      case "height":
        this.height = parseFloat(newValue)
        break
      default:
    }

    this.dispatchEvent(
      new CustomEvent("hookban-stones-changed", {
        bubbles: true,
        composed: true,
        detail: {
          attributeName: name,
          newValue,
          oldValue,
        },
      })
    )
  }
}
