# Inversify Express Example 

## Running tests
execute "npm run *test script*"

## Start Typescript Watch
Press ctrl+shit+b and select tsc: watch

## Useful
- Install mocha test explorer in VS Code
- add these settings to VS Code settings JSON (ctrl+shift+p --> Preferences: Open Settings (JSON)):
```
"files.exclude": {
    // include the defaults from VS Code
    "**/.git": true,
    "**/.DS_Store": true,
    "**/.idea": true,

    // exclude .js and .js.map files, when in a TypeScript project
    "**/*.js": { "when": "$(basename).ts"},
    "**/*.js.map": true
},
"typescript.updateImportsOnFileMove.enabled": "always",
"mochaExplorer.files": "src/Tests/**/*.ts",
"mochaExplorer.require": "ts-node/register",
"workbench.tree.indent": 17,
"workbench.list.horizontalScrolling": true,
"debug.javascript.autoAttachFilter": "smart",
"debug.node.autoAttach": "on"
```

