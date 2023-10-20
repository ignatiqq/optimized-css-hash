# optimized-css-hash

## Usage

You can use it like an **getLocalIdent** option in the 'css-loader'. 

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
