import { TaggedHTMLElement } from "./utils/exports"

export class HookbanBackground
  extends HTMLElement
  implements TaggedHTMLElement
{
  static readonly tag = "hookban-background"

  static readonly observedAttributes = [
    "width",
    "height",
    "color",
  ]

  private canvas: HTMLCanvasElement | undefined

  constructor(
    public width = 100,
    public height = 100,
    public color = "black"
  ) {
    super()
  }

  connectedCallback() {
    this.canvas = document.createElement("canvas")
    const shadowRoot = this.attachShadow({ mode: "open" })
    shadowRoot.appendChild(this.canvas)
    this.drawBackground()
  }

  drawBackground() {
    if (!this.canvas) return

    this.canvas.width = this.width
    this.canvas.height = this.height

    const ctx = this.canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = this.color
    ctx.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    )

    this.createImageBitmap()
  }

  // Necessary due to [this bug](https://stackoverflow.com/a/71201859/4756173).
  private createImageBitmap() {
    let bmp: ImageBitmap

    document.onvisibilitychange = async () => {
      if (!this.canvas) return

      if (document.visibilityState === "hidden") {
        bmp = await createImageBitmap(this.canvas)
      } else {
        const ctx = this.canvas.getContext("2d")
        if (!ctx) return

        ctx.globalCompositeOperation = "copy"
        ctx.drawImage(bmp, 0, 0)
        ctx.globalCompositeOperation = "source-over"
      }
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
      new CustomEvent("hookban-background-change", {
        bubbles: true,
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
