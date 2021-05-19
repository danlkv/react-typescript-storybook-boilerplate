## Testing

Tests are done with Mocha.

To use mocha with TypeScript and ES6, need to install `esm` and `ts-node`.

test command: `yarn test` or

```
npx mocha -r ts-node/register -r esm tests/
```

To watch changes: `yarn test-watch` or
```
npx mocha -r ts-node/register -r esm --watch tests/
```

