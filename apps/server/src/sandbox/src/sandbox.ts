import { Sandbox } from "e2b";

export async function createSandbox() {
    const sandbox = await Sandbox.create("react-app",{
        apiKey: process.env.E2B_KEY,
        timeoutMs: 10 * 60 * 1000,
    });
    
    const result = await sandbox.commands.run(
      'echo "Hello from E2B!"',
    );
    
    console.log("SDX RESULT:", result);
    console.log("SDX STD OUT", result.stdout);
}