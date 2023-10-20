const generateCssClass = require('css-class-generator');
const loaderUtils = require('loader-utils');

const createFileShortDef = fileHashedName => {
    return {name: fileHashedName, lastUsed: -1, ruleNames: {}};
};

const createGenerator = ({baseInterpolateName} = {baseInterpolateName: '[hash:base64:5]'}) => {
    const files = new Map();

    // eslint-disable-next-line max-params, max-statements
    return (loaderContext, localIdentName, localName) => {
        // css-loader config.localIdentName should contain [pathHash] for correct word
        if (!/\[pathHash]/.test(localIdentName)) {
            console.warn(
                `You should provide [pathHash] to localIdentName to use this plugin feature. \n Your localIdentName is: ${localIdentName}`,
            );

            // emulate default css-loader getLocalIdentName behavior
            // https://github.com/webpack-contrib/css-loader/blob/e27ab5ead47c6bcf8b218dbce52ddd692111e833/src/utils.js#L803
            return null;
        }

        let fileShort = files.get(loaderContext.resourcePath);

        if (!fileShort) {
            const fileHashedName = loaderUtils.interpolateName(
                loaderContext.context,
                baseInterpolateName,
                {
                    // any file should contaiil unique resuourse path. So it will be key for every classname in the file
                    content: `${loaderContext.resourcePath}`,
                },
            );

            const fileShortDef = createFileShortDef(fileHashedName);
            files.set(loaderContext.resourcePath, fileShortDef);
            fileShort = fileShortDef;
        }

        const ruleName = fileShort.ruleNames[localName];

        if (!ruleName) {
            fileShort.lastUsed += 1;

            const generatedClassname = `${generateCssClass(fileShort.lastUsed)}${fileShort.name}`;

            fileShort.ruleNames[localName] = generatedClassname;
        }

        return loaderUtils.interpolateName(
            loaderContext.context,
            localIdentName
                .replace('[local]', localName)
                .replace('[pathHash]', fileShort.ruleNames[localName]),
            {content: localName},
        );
    };
};

module.exports = {createGenerator};
