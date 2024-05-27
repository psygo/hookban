import {
  TaggedHTMLElement,
  setupCanvasScale,
} from "./utils/exports"

export class HookbanGrid
  extends HTMLElement
  implements TaggedHTMLElement
{
  static readonly tag = "hookban-grid"

  private canvas = document.createElement("canvas")

  constructor(
    public width = 100,
    public height = 100,
    public color = "#111",
    public nx = 19,
    public ny = 19
  ) {
    super()
  }

  connectedCallback() {
    this.setAttribute("width", this.width.toString())
    this.setAttribute("height", this.height.toString())
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

    const stepX = this.width / this.nx

    for (let x = 0; x <= this.width; x += stepX) {
      ctx.beginPath()
      ctx.moveTo(10, 10)
      ctx.lineTo(x, this.width)
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
      case "color":
        this.color = newValue
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
