import {
  HookbanBackground,
  HookbanContainer,
  HookbanGrid,
} from "./components/exports"

customElements.define(
  HookbanContainer.tag,
  HookbanContainer
)
customElements.define(
  HookbanBackground.tag,
  HookbanBackground
)
customElements.define(HookbanGrid.tag, HookbanGrid)
