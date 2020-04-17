import { generate, help, start, version } from "./actions";

export function main(args: ReadonlyArray<string>): void {
  if (args.length < 1) {
    help();
    process.exit(1);
  }

  const action = args[0];
  const restArgs = args.slice(1);

  switch (action) {
    case "generate":
      generate(restArgs).catch((error) => {
        console.error(error);
        process.exit(1);
      });
      break;
    case "help":
      help();
      break;
    case "version":
      version().catch((error) => {
        console.error(error);
        process.exit(1);
      });
      break;
    case "start":
      start(restArgs).catch((error) => {
        console.error(error);
        process.exit(1);
      });
      break;
    default:
      throw new Error("Unexpected action argument");
  }
}
