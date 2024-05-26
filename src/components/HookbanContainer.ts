import { TaggedHTMLElement } from "./utils/exports"

export class HookbanContainer
  extends HTMLElement
  implements TaggedHTMLElement
{
  static readonly tag = "hookban-container"

  private static readonly templateContent = /* html */ `
    <slot></slot>
  `

  connectedCallback() {
    const template = document.createElement("template")
    template.innerHTML = HookbanContainer.templateContent
    const shadowRoot = this.attachShadow({ mode: "open" })
    shadowRoot.appendChild(template.content.cloneNode(true))
  }
}
