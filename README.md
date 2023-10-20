# optimized-css-hash

## Usage

You can use it like an *getLocalIdent* option in the 'css-loader'. 

```
const {createGenerator} = require('optimized-css-hash');

{
            loader: 'css-loader',
            options: {
                modules: {
                    // pathHash is the necessary name to put the optimized hash to classname
                    localIdentName: '[name]__[local]___[pathHash]',
                    mode: 'global',
                    getLocalIdent: createGenerator(),
                },
            },
        },
```
