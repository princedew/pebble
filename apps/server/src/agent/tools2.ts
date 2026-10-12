import { Type, type Tool } from "@google/genai";

export const TOOL_NAME = {
  ADDITION: "addition",
  SUBTRACTION: "subtraction",
  MULTIPLY: "multiplication",
  DIVIDE: "division",
};

const additionTool: Tool = {
  type: "function",
  name: "addition",
  description: "Adds two numbers and returns their sum.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      a: {
        type: Type.NUMBER,
        description: "The first number.",
      },
      b: {
        type: Type.NUMBER,
        description: "The second number.",
      },
    },
    required: ["a", "b"],
  },
};

const subtractionTool: Tool = {
  type: "function",
  name: "subtraction",
  description: "Subtracts the second number from the first number.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      a: {
        type: Type.NUMBER,
        description: "The number to subtract from.",
      },
      b: {
        type: Type.NUMBER,
        description: "The number to subtract.",
      },
    },
    required: ["a", "b"],
  },
};

const multiplicationTool: Tool = {
  type: "function",
  name: "multiplication",
  description: "Multiplies two numbers and returns their product.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      a: {
        type: Type.NUMBER,
        description: "The first number.",
      },
      b: {
        type: Type.NUMBER,
        description: "The second number.",
      },
    },
    required: ["a", "b"],
  },
};

const divisionTool: Tool = {
  type: "function",
  name: "division",
  description: "Divides the first number by the second number.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      a: {
        type: Type.NUMBER,
        description: "The dividend.",
      },
      b: {
        type: Type.NUMBER,
        description: "The divisor. Must not be zero.",
      },
    },
    required: ["a", "b"],
  },
};

export const tools: Tool[] = [
  additionTool,
  subtractionTool,
  multiplicationTool,
  divisionTool,
];
