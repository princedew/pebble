import { GoogleGenAI } from "@google/genai";
import { schema, system_instruction } from "./systemInstruction";
import { TOOL_NAME, tools } from "./tools2";

if (!process.env.GEMINI_API_KEY) {
  console.log("> THERE IS NO GEMINI API KEY");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function modelCall(input: any[]) {
  const response = await ai.interactions.create({
    model: "gemini-3-flash-preview",
    store: false,
    system_instruction,
    input,
    generation_config: {
      thinking_level: "low",
    },
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema,
    },
    tools: tools,
  });
  if (!response) throw new Error("Failed to get sesponse");
  return response;
}

const history = [];

export async function agent(input: string, type: "text" = "text") {
  try {
    let firstCon = {
      type: "user_input",
      content: [{ type: type, text: input }],
    };
    history.push(firstCon);

    let finalRes;

    while (!finalRes) {
      const response = await modelCall(history);
      console.log("\n\n> AGENT-RES-steps:", response.steps);

      //  ??
      history.push(...response.steps);

      const step = response.steps.find((s) => s.type === "function_call");
      let result;

      if (step) {
        const argu = step.arguments;
        if (step.name === TOOL_NAME.ADDITION) {
          result = Number(argu.a) + Number(argu.b);
        } else if (step.name === TOOL_NAME.MULTIPLY) {
          result = Number(argu.a) * Number(argu.b);
        }
        history.push({
          type: "function_result",
          name: step.name,
          call_id: step.id,
          result: [{ type: "text", text: JSON.stringify(result) }],
        });
      } else {
        finalRes = response;
        console.log("\n\n> FINAL-RES:", finalRes);
      }
    }
    return finalRes;
  } catch (error) {
    console.log("\n> AGENT-ERROR:", error.message);
  }
}

// AGENT-RES: {
//   id: 'v1_ChdRT19NYXE3dEZQeXhnOFVQdU5xSmtRSRIXUU9fTWFxN3RGUHl4ZzhVUHVOcUprUUk',
//
//   status: 'requires_action',

//   usage: {
//     total_tokens: 468,
//     total_input_tokens: 452,
//     input_tokens_by_modality: [ [Object] ],
//     total_cached_tokens: 0,
//     total_output_tokens: 16,
//     total_tool_use_tokens: 0,
//     total_thought_tokens: 0,
//     raw_prompt_token: 706,
//     model_invocation_token_counts: [ [Object] ],
//     non_grounding_model_invocation_token_counts: [ [Object] ]
//   },
//   created: '2026-10-12T14:31:29Z',
//   updated: '2026-10-12T14:31:29Z',
//   service_tier: 'standard',
//   steps: [
//     {
//       signature: 'EmUKYwFpFH0TmTNld6mbKF/Z/Uozsz14rEl1ZxM8Z7Re4FMAzquH48ozFHo6u+Rpork+nGJ89ImaGWk+yHZ8NYsr5+iZtuV6CQpZsBNSh8BPCSCag8iVrkttRJbqV/H/6rcO9r8ugA==',
//       type: 'thought'
//     },
//     {
//       id: 'call_187403',
//       signature: 'EmUKYwFpFH0TmTNld6mbKF/Z/Uozsz14rEl1ZxM8Z7Re4FMAzquH48ozFHo6u+Rpork+nGJ89ImaGWk+yHZ8NYsr5+iZtuV6CQpZsBNSh8BPCSCag8iVrkttRJbqV/H/6rcO9r8ugA==',
//       type: 'function_call',
//       name: 'addition',
//       arguments: [Object]
//     }
//   ],
//   object: 'interaction',
//   model: 'gemini-3-flash-preview',
//   sdkHttpResponse: {
//     headers: {
//       'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
//       'content-encoding': 'gzip',
//       'content-type': 'application/json',
//       date: 'Mon, 12 Oct 2026 14:31:31 GMT',
//       server: 'scaffolding on HTTPServer2',
//       'server-timing': 'gfet4t7; dur=3885',
//       'transfer-encoding': 'chunked',
//       vary: 'Origin, X-Origin, Referer',
//       'x-content-type-options': 'nosniff',
//       'x-frame-options': 'SAMEORIGIN',
//       'x-xss-protection': '0'
//     },
//     responseInternal: Response {
//       status: 200,
//       statusText: 'OK',
//       headers: Headers {
//         'content-type': 'application/json',
//         vary: 'Origin, X-Origin, Referer',
//         'content-encoding': 'gzip',
//         date: 'Mon, 12 Oct 2026 14:31:31 GMT',
//         server: 'scaffolding on HTTPServer2',
//         'x-xss-protection': '0',
//         'x-frame-options': 'SAMEORIGIN',
//         'x-content-type-options': 'nosniff',
//         'server-timing': 'gfet4t7; dur=3885',
//         'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
//         'transfer-encoding': 'chunked'
//       },
//       body: ReadableStream { locked: true, state: 'closed', supportsBYOB: true },
//       bodyUsed: true,
//       ok: true,
//       redirected: false,
//       type: 'basic',
//       url: 'https://generativelanguage.googleapis.com/v1beta/interactions'
//     },
//     json: [AsyncFunction: json]
//   }
// }
// AGENT-RES undefined
