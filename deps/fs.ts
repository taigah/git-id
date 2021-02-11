// do not import fs/mod.ts until --unstable is not required anymore
export async function readJson(filePath: string): Promise<unknown> {
  const decoder = new TextDecoder("utf-8");

  const content = decoder.decode(await Deno.readFile(filePath));

  try {
    return JSON.parse(content);
  } catch (err) {
    err.message = `${filePath}: ${err.message}`;
    throw err;
  }
}

export async function writeJson(filePath: string, object: any): Promise<void> {
  const jsonString = JSON.stringify(object);
  await Deno.writeTextFile(filePath, jsonString);
}
