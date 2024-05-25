import { TaggedHTMLElement } from "./utils/TaggedHTMLElement"

export class HookbanBackground
  extends HTMLElement
  implements TaggedHTMLElement
{
  static readonly tag = "hookban-background"

  constructor() {
    super()
  }

  connectedCallback() {
    const canvas = document.createElement("canvas")

    canvas.height = 100
    canvas.width = 100

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "blue"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    this.appendChild(canvas)

    this.createImageBitmap()
  }

  async createImageBitmap() {
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
}
