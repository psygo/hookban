import {
  TaggedHTMLElement,
  setupCanvasScale,
} from "./utils/exports"

export class HookbanGrid
  extends HTMLElement
  implements TaggedHTMLElement
{
  static readonly tag = "hookban-grid"

  static readonly observedAttributes = [
    "width",
    "height",
    "padding",
    "color",
    "nx",
    "ny",
  ]

  private canvas = document.createElement("canvas")

  constructor(
    public width = 100,
    public height = 100,
    public padding = 10,
    public color = "#111",
    public nx = 19,
    public ny = 19
  ) {
    super()
  }

  connectedCallback() {
    this.setAttribute("width", this.width.toString())
    this.setAttribute("height", this.height.toString())
    this.setAttribute("padding", this.padding.toString())
    if (this.color && this.color !== "")
      this.setAttribute("color", this.color)
    this.setAttribute("nx", this.nx.toString())
    this.setAttribute("ny", this.ny.toString())

    const shadowRoot = this.attachShadow({ mode: "open" })
    shadowRoot.appendChild(this.canvas)

    this.canvas.style.position = "absolute"
    this.drawGrid()
  }

  drawGrid() {
    setupCanvasScale(this.canvas, this.width, this.height)

    const ctx = this.canvas.getContext("2d")
    if (!ctx) return

    const stepX =
      (this.width - 2 * this.padding) / (this.nx - 1)
    const stepY =
      (this.height - 2 * this.padding) / (this.ny - 1)

    for (let x = 0; x <= this.width; x += stepX) {
      ctx.beginPath()
      ctx.moveTo(this.padding + x, this.padding)
      ctx.lineTo(
        this.padding + x,
        this.height - this.padding
      )
      ctx.stroke()
    }

    for (let y = 0; y <= this.height; y += stepY) {
      ctx.beginPath()
      ctx.moveTo(this.padding, this.padding + y)
      ctx.lineTo(
        this.width - this.padding,
        this.padding + y
      )
      ctx.stroke()
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
      case "padding":
        this.padding = parseFloat(newValue)
        break
      case "color":
        this.color = newValue
        break
      case "nx":
        this.nx = parseInt(newValue)
        break
      case "ny":
        this.ny = parseInt(newValue)
        break
      default:
    }

    this.dispatchEvent(
      new CustomEvent("hookban-grid-changed", {
        bubbles: true,
        composed: true,
        detail: {
          attributeName: name,
          newValue,
          oldValue,
        },
      })
    )

    this.drawGrid()
  }
}
