import { TaggedHTMLElement } from "./utils/exports"

export class HookbanBackground
  extends HTMLElement
  implements TaggedHTMLElement
{
  static readonly tag = "hookban-background"

  static observedAttributes = ["width", "height"]

  public height: number = 100
  public width: number = 100

  private canvas = document.createElement("canvas")

  constructor(height: number = 100, width: number = 100) {
    super()

    this.height = height
    this.width = width
  }

  connectedCallback() {
    // TODO: missing default parameters
    this.drawBackground()
    this.appendChild(this.canvas)
    this.createImageBitmap()
  }

  drawBackground() {
    this.canvas.height = this.height
    this.canvas.width = this.width

    const ctx = this.canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "blue"
    ctx.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    )
  }

  // Necessary due to [this bug](https://stackoverflow.com/a/71201859/4756173).
  createImageBitmap() {
    let bmp: ImageBitmap

    document.onvisibilitychange = async () => {
      const canvas = document.querySelector("canvas")!

      if (document.visibilityState === "hidden") {
        bmp = await createImageBitmap(canvas)
      } else {
        const ctx = canvas.getContext("2d")
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
    console.log(
      `Attribute ${name} changed from ${oldValue} to ${newValue}`
    )
    switch (name) {
      case "width":
        this.width = parseFloat(newValue)
        break
      case "height":
        this.height = parseFloat(newValue)
        break
      default:
    }
  }
}
