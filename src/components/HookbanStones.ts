import {
  TaggedHTMLElement,
  WithEvtChange,
  setupCanvasScale,
} from "./utils/exports"

export class HookbanStones
  extends HTMLElement
  implements TaggedHTMLElement, WithEvtChange
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

    this.canvas.style.position = "absolute"
    this.canvas.style.zIndex = "1000"
    setupCanvasScale(this.canvas, this.width, this.height)

    this.addEventListener("hookban-stones-change", (e) =>
      this.onEvtChange(e as CustomEvent)
    )
  }

  onEvtChange(e: CustomEvent) {
    const stones = e.detail.stones

    if (!stones) return

    const ctx = this.canvas.getContext("2d")
    if (!ctx) return

    const stoneRadius = this.width / 19 / 2

    for (const move of stones) {
      ctx.beginPath()
      ctx.arc(
        move.x - stoneRadius / 2,
        move.y - stoneRadius / 2,
        stoneRadius,
        0,
        2 * Math.PI
      )
      ctx.fillStyle = move.color
      ctx.fill()
    }
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
