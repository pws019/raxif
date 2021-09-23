import { transform } from "@babel/core";
const path = require('path');

const pluginPath = path.resolve(__dirname, './plugin.js');
const workPath = path.resolve(__dirname, '../../');

export default (code) => {
  return new Promise((resolve) => {
    transform(code, {
      cwd: workPath,
      parserOpts: {
        createParenthesizedExpressions: true,
      },
      presets: [],
      plugins: [
        '@babel/plugin-syntax-jsx',
        pluginPath,
      ]
    }, function(err, ret) {
      console.log(err);
      if(!err) {
        resolve(ret.code);
      }
    });
  })
}

// export default (code) => {
//   const ret = transformSync(code, {
//     cwd: workPath,
//     presets: [],
//     plugins: [
//       '@babel/plugin-syntax-jsx',
//       pluginPath,
//     ]
//   })
//   return ret.code;
// }