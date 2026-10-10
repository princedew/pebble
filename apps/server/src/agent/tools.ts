import {Type} from "@google/genai";

const listTool = {
  type: 'function',
  name: 'list',
  description: 'list all the files and folder in that directory.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      path:{type:Type.STRING, description:"The path in which u want to check wht files and folder are there."}
    },
    required: ["path"],
  },
};

const readTool = {
  type: 'function',
  name: 'read',
  description: 'read the file in that directory.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      path:{type:Type.STRING, description:"The path of the file that u want to read."}
    },
    required: ["path"],
  },
};

const writeTool = {
  type: 'function',
  name: 'write',
  description: 'write in that file.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      path:{type:Type.STRING, description:"The path of the file that u want to read."},
      content:{type:Type.STRING, description:"The code that u want to write in the path"}
    },
    required: ["path", "content"],
  },
};

const runCommand = {
    type:"function",
    name:"runCommand",
    description:"will run the command in sandbox shell.",
    parameter:{
        type:Type.OBJECT,
        properties:{
            command: {type:Type.STRING, description:"The command that u want to run in sandbox shell."},
            cwd: {type:Type.STRING, description:"The directory from which u want to run the command."}
        }
    }
}

export const tools = [listTool, readTool, writeTool, runCommand];