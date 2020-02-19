import * as babylon from "babylon";
import * as recast from "recast";

export function wrapInAsyncFunction(code: string): string {
  const codeInAsyncFunction = `(async () => {
    ${code}
  })()`;

  const ast = recast.parse(codeInAsyncFunction, { parser: babylon });
  const body = ast.program.body[0].expression.callee.body.body;

  if (body.length !== 0) {
    const last = body.pop();
    if (last.type === "ExpressionStatement") {
      body.push({
        type: "ReturnStatement",
        argument: last,
      });
    } else {
      body.push(last);
    }
  }

  // Remove var, let, const from variable declarations to make them available in context
  ast.program.body[0].expression.callee.body.body = body.map((node: any) => {
    if (node.type === "VariableDeclaration") {
      return {
        type: "ExpressionStatement",
        expression: {
          type: "SequenceExpression",
          expressions: node.declarations.map((declaration: any) => ({
            type: "AssignmentExpression",
            operator: "=",
            left: declaration.id,
            right: declaration.init,
          })),
        },
      };
    } else {
      return node;
    }
  });

  return recast.print(ast).code;
}
