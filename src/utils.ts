import * as fs from "fs";
import * as path from "path";

export function writeFile<T>(param: {
  dirname: string;
  fileName: string;
  data: T;
}) {
  const filePath = path.join(param.dirname, param.fileName);

  // Check if the directory does not exist
  if (!fs.existsSync(param.dirname)) {
    // Create the directory if it does not exist
    fs.mkdirSync(param.dirname, { recursive: true });
    console.log("Directory created:", param.dirname);
  }

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Delete the file if it exists
    fs.unlinkSync(filePath);
    console.log("Existing file deleted:", filePath);
  }

  // Write the data to a new JSON file
  fs.writeFile(filePath, JSON.stringify(param.data, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("New JSON file has been saved:", filePath);
    }
  });
}

export async function readFile<T>(filepath: string): Promise<T> {
  const data = await fs.promises.readFile(filepath, "utf8");

  return JSON.parse(data);
}
