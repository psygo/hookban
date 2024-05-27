// Fixes [this bug](https://stackoverflow.com/a/71201859/4756173).
export function cacheCanvas(canvas: HTMLCanvasElement) {
  let bmp: ImageBitmap

  document.onvisibilitychange = async () => {
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
