import {
  HookbanBackground,
  HookbanContainer,
  HookbanGrid,
  HookbanStones,
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
customElements.define(HookbanStones.tag, HookbanStones)
