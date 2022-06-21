# vue-carousel-card-selector
Pass in an array items, this component will render some animated cards with a textbox. When user clicks on a card, it will select the item by emitting the `selectItem` event with the selected value. The textbox acts as a string-based filter, default filter function can be overriden. 

**See [here](`https://vue-carousel-card-selector.web.app`) for live demo.**

See `./src/App.vue` to see use of component in code.

See `./src/components/TopLevel.vue` for (top-level) Vue component.

See `./src/helpers/defaultFilterFunct.js` for default filter function.

### Props
- dataItems: Array of selectable items, as primitives or objects.
- filterFunct: A function with the signature `(dataItems, filterString): boolean`, where filterString is the filter value entered via the rendered textbox, and boolean truth indicates include.
- disabled: Boolean value, disables the component if true.

### Emits
- selectItem: Emitted when an item is selected.

### Styling
Override SCSS variables specified in `./src/styles/vars.scss` with your own values — in your own stylesheet!

## Useful commands
### Project setup:
```
npm install
```

### To develop or test:
```
npm run serve
```

### To build component for deployment to NPM package repository:

```
npm run build-lib
```

### To build for demo (deployment):
```
npm run build
```

## Useful links
- [Component demonstration](https://vue-carousel-card-selector.web.app)
- [Building Vue components for NPM](https://5balloons.info/create-publish-you-first-vue-plugin-on-npm-the-right-way/)
- [Markdown syntax](https://www.markdownguide.org/basic-syntax/#links)