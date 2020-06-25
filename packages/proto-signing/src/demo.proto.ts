// Without this TS infers this is a string literal.
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const proto: string = `
syntax = "proto3";
package demo;

message MsgDemo {
  string example = 1;
}
`;

export default proto;
