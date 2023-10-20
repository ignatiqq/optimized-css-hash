# optimized-css-hash

article idea - https://dev.to/denisx/reduce-bundle-size-via-one-letter-css-classname-hash-strategy-10g6

## Usage

You can use it like a **getLocalIdent** option in the 'css-loader'. 

```
const {createGenerator} = require('optimized-css-hash');

{
            loader: 'css-loader',
            options: {
                modules: {
                    // pathHash is the required name to place the optimized hash in the class name.
                    localIdentName: '[name]__[local]___[pathHash]',
                    mode: 'global',
                    getLocalIdent: createGenerator(),
                },
            },
        },
```
