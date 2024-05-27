# Hookban

A hookable goban.

A composable goban with no dependencies, made entirely with Vanilla JS and Web Components, which makes integration into any web platform easier.

The 2 key features of this implementation would be:

- Communication through events
- Hooks for when things change.

## How It Works

### A Goban in Layers

We can achieve more fine grained control, and simpler components by deconstructing goban features into layers:

```html
<hookban-container>
  <hookban-stones></hookban-stones>
  <hookban-grid></hookban-grid>
  <hookban-background
    oncolorchange="() => console.log('color changed')"
  ></hookban-background>
</hookban-container>
```

By decomposing things in this way, anyone can easily create other custom layers as well. Ideally, each layer should be simple enough, that a developer could simply copy paste the original code and alter it in a couple of hours, I believe.

Then, it's just a matter of setting properties on each HTML component:

```html
<div class="form-field">
  <label for="background-color">Color</label>
  <input id="background-color" type="color" />
</div>
```

```js
const backgroundColorInput = document.querySelector(
  "#background-color"
)

backgroundColorInput.addEventListener("input", (e) => {
  const hookbanBackground = document.querySelector(
    "hookban-background"
  )
  hookbanBackground.setAttribute("color", e.target.value)
})
```

Or, alternatively, we could also use them as JS objects, and later append them to the DOM.

### But what about SGF and Go rules?

I think that, for the sake of simplicity and separation of concerns, this shouldn't be coupled with the UI. I recommend keeping controls outside the Goban UI, and then use them to communicate things in and out of the UI. I do have plans of packaging all of it in a macro component at some point.
