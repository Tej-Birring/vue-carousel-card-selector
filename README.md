# vue-carousel-card-selector
Pass in an array items, this component will render an animated card-based selector with a textbox filter.

See `./src/App.vue` to see use of component.

See `./src/components/TopLevel.vue` for component (top-level).

#### Props
- dataItems: Array of selectable items, as primitives or objects.
- filterFunct: A function with the signature `(dataItems, filterString): boolean`, where filterString is the filter value entered via the rendered textbox, and boolean truth indicates include.
- disabled: Boolean value, disables the component if true.

#### Emits
- selectItem: Emitted when an item is selected.

## Project setup
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

