import { Template, defaultBuildLogger, waitForPort } from "e2b";

const template = Template()
  .fromImage("node:22")
  .copy("./template/", "/home/user/app")
  .runCmd("cd /home/user/app && npm install")
  .setStartCmd(
    "cd /home/user/app && npm run dev -- --host 0.0.0.0",
    waitForPort(5173),
  );

export async function main(): Promise<void> {
  const result = await Template.build(template, "pebble-react", {
    apiKey: process.env.E2B_API_KEY,
    cpuCount: 2,
    memoryMB: 2048,
    onBuildLogs: defaultBuildLogger(),
  });

  console.log("Template build completed:", result);
}

