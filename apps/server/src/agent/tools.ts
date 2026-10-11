import { Type, type Tool } from "@google/genai";

const listTool = {
  type: "function",
  name: "list",
  description: "list all the files and folder in that directory.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      path: {
        type: Type.STRING,
        description:
          "The path in which u want to check wht files and folder are there.",
      },
    },
    required: ["path"],
  },
};

const readTool = {
  type: "function",
  name: "read",
  description: "read the file in that directory.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      path: {
        type: Type.STRING,
        description: "The path of the file that u want to read.",
      },
    },
    required: ["path"],
  },
};

const writeTool = {
  type: "function",
  name: "write",
  description: "write in that file.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      files: {
        type: Type.ARRAY,
        description: "The files to create or update.",
        items: {
          type:Type.OBJECT,
          properties: {
            path: {
              type: Type.STRING,
              description: "The path of the file that u want to read.",
            },
            data: {
              type: Type.STRING,
              description: "The code that u want to write in the path",
            },
          },
          required: ["path", "data"],
        },
      },
    },
    required: ["files"],
  },
};

const runCommand = {
  type: "function",
  name: "runCommand",
  description: "will run the command in sandbox shell.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      command: {
        type: Type.STRING,
        description: "The command that u want to run in sandbox shell.",
      },
      cwd: {
        type: Type.STRING,
        description: "The directory from which u want to run the command.",
      },
    },
    required: ["cwd", "command"],
  },
};

const previewUrl = {
  type: "function",
  name: "previewUrl",
  description: "will give u the preview url",
  parameters: {
    type: Type.OBJECT,
    properties: {
      port: {
        type: Type.NUMBER,
        description: "The port in which u are running the app.",
      },
    },
    required: ["port"],
  },
};

export const tools = [listTool, readTool, writeTool, runCommand, previewUrl];
