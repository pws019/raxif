export default function (babel) {
  const { types: t } = babel;

  return {
    name: "ast-transform", // not required
    visitor: {
      JSXElement(path) {
        const rIndex = path.node.openingElement.attributes.findIndex((v) => {
          // console.log(v.name)
          return v.name && v.name.name === "r-if";
        });
        // console.log(rIndex)
        if (typeof rIndex === "undefined" || rIndex < 0) {
          return;
        }
        // const attribute = path.node.openingElement.attributes[rIndex];
        const r = path.get(`openingElement.attributes.${rIndex}.value`);
        // console.log(r)

        if (!t.isJSXExpressionContainer(r.node)) {
          return;
        }
        const showCondition = r.node.expression;
        r.parentPath.remove();

        // if (t.isExpressionStatement(path.parentPath.node)) {
        //   path.replaceWith(
        //     t.blockStatement([
        //       t.ExpressionStatement(
        //         t.ConditionalExpression(
        //           showCondition,
        //           path.node,
        //           t.NullLiteral()
        //         )
        //       ),
        //     ])
        //   );
        // } else {
        //   path.replaceWith(
        //     t.jsxExpressionContainer(
        //       t.ConditionalExpression(showCondition, path.node, t.NullLiteral())
        //     )
        //   );
        // }
        if(t.isJSX(path.parentPath.node)) {
          path.replaceWith(
            t.jsxExpressionContainer(
              t.ConditionalExpression(showCondition, path.node, t.NullLiteral())
            )
          );
        } else {
          path.replaceWith(
            t.blockStatement([
              t.ExpressionStatement(
                t.ConditionalExpression(
                  showCondition,
                  path.node,
                  t.NullLiteral()
                )
              ),
            ])
          );
        }
      },
    },
  };
}
