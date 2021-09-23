import { transform } from "@babel/core";
import * as xxx from "@babel/plugin-syntax-jsx";

export default (code) => {
  return new Promise((resolve) => {
    transform(code, {
      presets: [],
      plugins: [
        "@babel/plugin-syntax-jsx",
        './plugin.js'
      ]
    }, function(err, ret) {
      console.log(err, ret);
      if(!err) {
        resolve(ret.code);
      }
    });
  })
}