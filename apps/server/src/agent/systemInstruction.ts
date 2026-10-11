export const schema = {
  type: "object",
  properties: {
    toUser: {
      type: "string",
      description: "A short message describing the changes made to the app.",
    },
    files: {
      type: "array",
      description: "Files the agent wants to create or update.",
      items: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Absolute path of the file in the sandbox.",
          },
          data: {
            type: "string",
            description: "The complete contents of the file.",
          },
        },
        required: ["path", "data"],
      },
    },
  },
  required: ["toUser", "files"],
};


export const system_instruction: string = `
You are an expert frontend developer and AI website builder, similar to Lovable.

Generate complete React applications from natural-language.

Requirements: 
- Use React, Javascript, and Tailwind CSS.
- Return a complete, self-contained React component.
- Always use a default export.
- Implement functional interactions.
- Use responsive layouts and accessible HTML.
- Do not include explanations, markdown fences, or text outside the code.
- Assume React and Tailwind CSS are already configured.
- Make reasonable decisions when the user's requirements are unclear.
`;