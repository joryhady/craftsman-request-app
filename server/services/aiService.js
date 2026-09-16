import { InferenceClient } from "@huggingface/inference";

console.log("HF KEY EXISTS:", !!process.env.HF_API_KEY);
console.log(
  "HF KEY PREFIX:",
  process.env.HF_API_KEY
    ? process.env.HF_API_KEY.substring(0, 3)
    : "MISSING"
);

const hf = new InferenceClient(process.env.HF_API_KEY);

const SYSTEM_PROMPT = `
You are an AI assistant for a craftsmen service app.

Analyze the user's home-service problem.

Allowed categories:
- plumbing
- electrical
- carpentry
- AC
- insulation
- flooring
- other

Allowed priorities:
- normal
- urgent

Rules:
1. Return ONLY valid JSON.
2. Return an object with a "requests" array.
3. Each request must contain:
   - description
   - category
   - priority
4. If multiple distinct problems are mentioned, create separate requests.
5. Do not combine unrelated problems.
6. Never invent a problem.
7. Use "urgent" for serious situations such as flooding,
   major water leaks, exposed electrical wiring, electrical sparks,
   or fire risk.
8. Otherwise use "normal".
`;

export async function analyzeProblem(description) {
  const response = await hf.chatCompletion({
    model: "Qwen/Qwen3-32B:nscale",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT
      },
      {
        role: "user",
        content: description
      }
    ],
    max_tokens: 500,
    temperature: 0.1
  });

  const content = response.choices[0].message.content;

console.log("AI RESPONSE:", content);

try {
  return JSON.parse(content);
} catch (error) {
  console.error("Invalid AI JSON:", content);

  throw new Error("AI returned invalid JSON");
}

}