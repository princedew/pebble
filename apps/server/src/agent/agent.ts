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
    // system_instruction,
    input,
    generation_config: {
      thinking_level: "low",
    },
    // response_format: {
    //   type: "text",
    //   mime_type: "application/json",
    //   schema,
    // },
    tools: tools,
  });
  if (!response) throw new Error("Failed to get sesponse");
  return response;
}

export async function agent(input: string, type: "text" = "text") {
  const history = [];
  try {
    let firstCon = {
      type: "user_input",
      content: [{ type: type, text: input }],
    };
    history.push(firstCon);

    let run = true;
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
        run = false;
        finalRes = response;
        const step = response.steps.find((s) => s.type === "model_output");
        console.dir(step?.content, { depth: null });
        console.log("\n\n> FINAL-RES:", finalRes);
      }
    }
    return finalRes;
  } catch (error) {
    console.log("\n> AGENT-ERROR:", error.message);
  }
}

// {"level":30,"time":1791887924543,"pid":15904,"hostname":"Prince","msg":"Server running on port 5000"}


// > AGENT-RES-steps: [
//   {
//     signature: 'EmQKYgFpFH0TOS71NohcAFqU3ceeDN1W3F6rhKe2AXUWXHPU9k5jjIKTlq9NUpqiPbIrHmWJoOt8aIN4rpo89S37YTQ9+nuHI+4FhOGeQr5+8yHFK0tNLtJ0eo+Z9z32/b38m0dS',
//     type: 'thought'
//   },
//   {
//     id: 'call_468066',
//     signature: 'EmQKYgFpFH0TOS71NohcAFqU3ceeDN1W3F6rhKe2AXUWXHPU9k5jjIKTlq9NUpqiPbIrHmWJoOt8aIN4rpo89S37YTQ9+nuHI+4FhOGeQr5+8yHFK0tNLtJ0eo+Z9z32/b38m0dS',
//     type: 'function_call',
//     name: 'addition',
//     arguments: { b: 4, a: 3 }
//   }
// ]


// > AGENT-RES-steps: [
//   {
//     signature: 'EmQKYgFpFH0Tv3joOqjtp4D12A91LmS8Pu1gjeam2k7IyJvjlhKbYnJ3NeZFk+RbFaqx+eGDvjBa7mUJrAbx9pRZljlK0qqNiglK6TH5dH3HRar9lk+X5L1C09Td7R/iZQ9zEDes',
//     type: 'thought'
//   },
//   {
//     id: 'call_343532',
//     signature: 'EmQKYgFpFH0Tv3joOqjtp4D12A91LmS8Pu1gjeam2k7IyJvjlhKbYnJ3NeZFk+RbFaqx+eGDvjBa7mUJrAbx9pRZljlK0qqNiglK6TH5dH3HRar9lk+X5L1C09Td7R/iZQ9zEDes',
//     type: 'function_call',
//     name: 'multiplication',
//     arguments: { b: 2, a: 7 }
//   }
// ]


// > AGENT-RES-steps: [
//   {
//     signature: 'EmQKYgFpFH0THnXWjDJHg8UAXhkJr5Pz0ktyNRR/9iIvxo9184uDCSi4A7IeO9H5o7ym22JqddiNFDjCAnI2klX7mRv1YS7EuK/PdR0jqPkRN7LgmB6Wiij843ZZXSN/anzf2Mar',
//     type: 'thought'
//   },
//   { content: [ [Object] ], type: 'model_output' }
// ]
// [
//   {
//     text: 'The result of 3 + 4 is 7, and multiplying that by 2 gives 14.',
//     type: 'text'
//   }
// ]


// > FINAL-RES: {
//   status: 'completed',
//   usage: {
//     total_tokens: 391,
//     total_input_tokens: 368,
//     input_tokens_by_modality: [ [Object] ],
//     total_cached_tokens: 0,
//     total_output_tokens: 23,
//     total_tool_use_tokens: 0,
//     total_thought_tokens: 0
//   },
//   created: '2026-10-13T10:39:26Z',
//   updated: '2026-10-13T10:39:26Z',
//   service_tier: 'standard',
//   steps: [
//     {
//       signature: 'EmQKYgFpFH0THnXWjDJHg8UAXhkJr5Pz0ktyNRR/9iIvxo9184uDCSi4A7IeO9H5o7ym22JqddiNFDjCAnI2klX7mRv1YS7EuK/PdR0jqPkRN7LgmB6Wiij843ZZXSN/anzf2Mar',
//       type: 'thought'
//     },
//     { content: [Array], type: 'model_output' }
//   ],
//   object: 'interaction',
//   model: 'gemini-3-flash-preview',
//   sdkHttpResponse: {
//     headers: {
//       'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
//       'content-encoding': 'gzip',
//       'content-type': 'application/json',
//       date: 'Tue, 13 Oct 2026 10:39:26 GMT',
//       server: 'scaffolding on HTTPServer2',
//       'server-timing': 'gfet4t7; dur=11851',
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
//         date: 'Tue, 13 Oct 2026 10:39:26 GMT',
//         server: 'scaffolding on HTTPServer2',
//         'x-xss-protection': '0',
//         'x-frame-options': 'SAMEORIGIN',
//         'x-content-type-options': 'nosniff',
//         'server-timing': 'gfet4t7; dur=11851',
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
//   },
//   output_text: 'The result of 3 + 4 is 7, and multiplying that by 2 gives 14.'
// }
// AGENT-RES {
//   status: 'completed',
//   usage: {
//     total_tokens: 391,
//     total_input_tokens: 368,
//     input_tokens_by_modality: [ [Object] ],
//     total_cached_tokens: 0,
//     total_output_tokens: 23,
//     total_tool_use_tokens: 0,
//     total_thought_tokens: 0
//   },
//   created: '2026-10-13T10:39:26Z',
//   updated: '2026-10-13T10:39:26Z',
//   service_tier: 'standard',
//   steps: [
//     {
//       signature: 'EmQKYgFpFH0THnXWjDJHg8UAXhkJr5Pz0ktyNRR/9iIvxo9184uDCSi4A7IeO9H5o7ym22JqddiNFDjCAnI2klX7mRv1YS7EuK/PdR0jqPkRN7LgmB6Wiij843ZZXSN/anzf2Mar',
//       type: 'thought'
//     },
//     { content: [Array], type: 'model_output' }
//   ],
//   object: 'interaction',
//   model: 'gemini-3-flash-preview',
//   sdkHttpResponse: {
//     headers: {
//       'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
//       'content-encoding': 'gzip',
//       'content-type': 'application/json',
//       date: 'Tue, 13 Oct 2026 10:39:26 GMT',
//       server: 'scaffolding on HTTPServer2',
//       'server-timing': 'gfet4t7; dur=11851',
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
//         date: 'Tue, 13 Oct 2026 10:39:26 GMT',
//         server: 'scaffolding on HTTPServer2',
//         'x-xss-protection': '0',
//         'x-frame-options': 'SAMEORIGIN',
//         'x-content-type-options': 'nosniff',
//         'server-timing': 'gfet4t7; dur=11851',
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
//   },
//   output_text: 'The result of 3 + 4 is 7, and multiplying that by 2 gives 14.'
// }