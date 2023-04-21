# react-tw

`react-tw` is a toolkit for working with react and, but not limited to, tailwind.

* Written in Typescript for type safety
* Tiny bundle size (`0.4kb`)

## Why 

We all can acknowledge what a mess your react components quickly turns into when starting to add all these tailwind classes to your divs 🥲

## How

```tsx
import { createStyles } from 'react-tw'

interface StyleParams {
  highlighted: boolean
}

interface Props {
  className?: string
}

const useStyles = createStyles(({ highlighted }: StyleParams) => ({
  card: [
    `bg-white rounded-md shadow-lg`,
    [`px-4`, `py-3`], // grouping (works the same as above)
    ['border', 'border-solid'],
    [highlighted, `border-green-500`, `border-black`] // [condition, value if true, (optional) if false]
  ]
}))

function Card({ highlighted, className }: Props & StyleParams){
  const { classes } = useStyles({ highlighted });

  return <div className={cx(classes.card, className)}>{/* rest of your component */}</div>
}

```

## Features

Classes can be defined in many ways, see examples below:


### Multiple layers of arrays
```tsx
createStyles(({ variant, primary = true }) => {
  card: [
    [
      variant === "outlined", 
      [primary, "border-green-500"],
      "bg-green-500"
    ]
  ]
})
```

### Objects

```tsx
createStyles(({ variant, primary = true }) => {
  card: {
    "bg-green-500": primary && variant !== "outlined",
    "border-green-500": variant === "outlined",
  }
});
```

### Strings

```tsx
createStyles(({ variant, primary = true }) => {
  card: `bg-green-500 rounded shadow-sm`,
  cardHeader: [
    "text-black text-xl",
    "font-mono"
  ]
});
```

## Contribute

Feel free to contribute by reporting bugs, refine docs, fix bugs or add features.