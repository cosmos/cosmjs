import fs from "fs";

export async function version(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.readFile(__dirname + "/../../package.json", { encoding: "utf8" }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        const packagejson = JSON.parse(data);
        process.stdout.write(`${packagejson.version}\n`);
        resolve();
      }
    });
  });
}
