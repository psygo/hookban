import { TaggedHTMLElement } from "./utils/exports"

export class HookbanBackground
  extends HTMLElement
  implements TaggedHTMLElement
{
  static readonly tag = "hookban-background"

  static observedAttributes = ["width", "height"]

  private canvas: HTMLCanvasElement | undefined

  constructor(public width = 100, public height = 100) {
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

    console.log(
      "parent",
      this.parentElement?.clientHeight,
      this.parentElement?.clientWidth
    )
    // this.canvas.height = this.parentElement!.clientHeight
    // this.canvas.width = this.parentElement!.clientWidth
    this.canvas.width = this.width
    this.canvas.height = this.height

    // this.canvas.style.resize = "both"
    // this.canvas.style.overflow = "auto"

    const ctx = this.canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "blue"
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
    _oldValue: string,
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

    this.drawBackground()
  }
}
