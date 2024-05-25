export default class HookbanContainer extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = /* html */ `
      <p>here</p>
    `
  }
}
