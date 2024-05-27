import {
  TaggedHTMLElement,
  setupCanvasScale,
  WithEvtChange,
} from "./utils/exports"

type OnColorChange = (
  newColor: string,
  oldColor: string
) => void

export class HookbanBackground
  extends HTMLElement
  implements TaggedHTMLElement, WithEvtChange
{
  static readonly tag = "hookban-background"

  static readonly observedAttributes = [
    "width",
    "height",
    "color",
    "img",
    "oncolorchange",
  ]

  private canvas = document.createElement("canvas")

  constructor(
    public width = 100,
    public height = 100,
    public color = "#cfb844",
    public img = "",
    public onColorChange: OnColorChange = () => {}
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
    if (this.onColorChange !== null)
      this.setAttribute(
        "oncolorchange",
        this.onColorChange.toString()
      )

    const shadowRoot = this.attachShadow({ mode: "open" })
    shadowRoot.appendChild(this.canvas)

    this.drawBackground()

    this.addEventListener(
      "hookban-background-change",
      (e) => this.onEvtChange(e as CustomEvent)
    )
  }

  onEvtChange(e: CustomEvent) {
    const detail = e.detail

    if (detail.width) {
      this.width = detail.width
      this.setAttribute("width", this.width.toString())
    }
    if (detail.height) {
      this.height = detail.height
      this.setAttribute("height", this.height.toString())
    }
    if (detail.color) {
      this.color = detail.color
      this.setAttribute("color", this.color)
    }
    if (detail.img) {
      this.img = detail.img
      this.setAttribute("img", this.img)
    }
    if (detail.onColorChange) {
      this.onColorChange = detail.onColorChange
      this.setAttribute(
        "onColorChange",
        this.onColorChange.toString()
      )
    }

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
        this.onColorChange(newValue, oldValue)
        break
      case "img":
        this.img = newValue
        break
      case "oncolorchange":
        this.onColorChange = eval(newValue)
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
