import { Field, Root, Type } from "protobufjs";

export const MsgDemo = new Type("MsgDemo").add(new Field("example", 1, "string"));

const root = new Root().define("demo").add(MsgDemo);

export default root;
