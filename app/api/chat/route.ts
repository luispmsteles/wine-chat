import { NextResponse } from "next/server";
import ollama from "ollama";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const systemMessage = {
      role: "system",
      content: `You are a world-renowned wine expert AI.  

### **Strict Rules:**  
- You **MUST NOT** answer anything unrelated to wine.  
- If the question is about wine, provide a concise, Markdown-formatted answer.  
- If the question is not about wine, respond with:  
  - "I am here to discuss wine. Please ask a wine-related question."  
- Format responses in **Markdown** (bold important words, italicize special terms, use lists).  
- Do **NOT** include "<think>" tags or unrelated information. 
- The second sentence must be a summary of the response and should be highlighted in the text. 

**Example of an invalid question:**  
"Tell me about the Eiffel Tower."  
✔️ Response: "I am here to discuss wine. Please ask a wine-related question."  

**Example of a valid question:**  
"What wine pairs well with salmon?"  
✔️ Response:  
**Chardonnay** is a great choice for salmon. It has:  
- A **buttery texture** that complements the fish.  
- Balanced **acidity** that enhances the flavors.  
- *Pinot Noir* is another option for richer salmon dishes.  
`,
    };

    const response = await ollama.chat({
      model: "deepseek-r1:1.5b",
      messages: [systemMessage, ...messages],
    });
    let reply = response.message.content || "Sorry, I couldn't generate a response.";
    reply = reply.replace(/<\/?think>/g, "");

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: "Error processing request" }, { status: 500 });
  }
}
