import {
  TaggedHTMLElement,
  setupCanvasScale,
} from "./utils/exports"

export class HookbanBackground
  extends HTMLElement
  implements TaggedHTMLElement
{
  static readonly tag = "hookban-background"

  static readonly observedAttributes = [
    "width",
    "height",
    "color",
    "img",
  ]

  private canvas = document.createElement("canvas")

  constructor(
    public width = 100,
    public height = 100,
    public color = "#cfb844",
    public img = ""
  ) {
    super()
  }

  connectedCallback() {
    this.setAttribute("width", this.width.toString())
    this.setAttribute("height", this.height.toString())
    if (this.color && this.color !== "")
      this.setAttribute("color", this.color)
    if (this.img && this.img !== "")
      this.setAttribute("img", this.img)

    const shadowRoot = this.attachShadow({ mode: "open" })
    shadowRoot.appendChild(this.canvas)

    this.drawBackground()
  }

  drawBackground() {
    setupCanvasScale(this.canvas, this.width, this.height)

    const ctx = this.canvas.getContext("2d")
    if (!ctx) return

    if (this.img && this.img !== "") {
      const imgEl = new Image()
      imgEl.onload = () =>
        ctx.drawImage(imgEl, 0, 0, this.width, this.height)
      imgEl.src = this.img
    } else {
      ctx.fillStyle = this.color
      ctx.fillRect(0, 0, this.width, this.height)
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
      case "color":
        this.color = newValue
        break
      case "img":
        this.img = newValue
        break
      default:
    }

    this.dispatchEvent(
      new CustomEvent("hookban-background-changed", {
        bubbles: true,
        composed: true,
        detail: {
          attributeName: name,
          newValue,
          oldValue,
        },
      })
    )

    this.drawBackground()
  }
}
