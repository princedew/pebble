import { defaultBuildLogger, Template, waitForPort } from "e2b";

export async function main() {
  try {
    const template = Template()
      .fromImage("node:22")
      .aptInstall(["curl"])
      .setWorkdir("/app")
      .copy("./template", "/app")
      .runCmd("npm install")
      .setStartCmd("npm run dev -- --host 0.0.0.0", waitForPort(5173));

    const buildInfo = await Template.build(template, "react-template", {
      cpuCount: 2,
      memoryMB: 2048,
      skipCache: false,
      onBuildLogs: defaultBuildLogger(),
      apiKey: process.env.E2B_API_KEY,
    });
    console.log("Build successful:", buildInfo);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error name:", error.name);
      console.error("Error stack:", error.stack);
      console.error("Error cause:", error.cause);
      const err = error as any;
      console.error("Error statusCode:", err.statusCode);
      console.error("Error details:", err.details);
      console.error("Error body:", err.body);
    } else {
      console.error("Unknown error:", error);
    }
    process.exitCode = 1;
  }
}

// main();