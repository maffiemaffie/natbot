const GROK_PROMPT = require("./grok-prompt.js");
const GROK_EXPERIMENTAL = require("./grok-prompt-experimental.js");

const url = 'https://openrouter.ai/api/v1/chat/completions';
const model = 'deepseek/deepseek-chat-v3-0324:free';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.GROK_KEY}`
};

const getBodyForMessage = (message) => {
  const body = {
    'model': model,
    'messages': [
      {
        'role': 'system',
        'content': GROK_PROMPT
      },
      {
        'role': 'user',
        'content': message
      }
    ],
    'temperature': 0.7
  }

  if (process.env.experimental === 'true') {
    body.messages.push({
      'role': 'system',
      'content': GROK_EXPERIMENTAL
    })
  };

  return body;
};

const getGrokResponse = (input) => {
  const message = `
  The current time is ${input.currentTime}.

  User ${input.message.author} (user id: ${input.message.id}) has sent the following message:
  ${input.message.content} at  ${input.message.createdAt}.

  This message was a reply to user ${input.repliedTo.author} (user id: ${input.repliedTo.id}) who said:
  ${input.repliedTo.content} at ${input.repliedTo.createdAt}.
  
  For context, the last 10 messages in this channel were as follows:
  ${input.context.map(msg => `${msg.author} (user id: ${msg.id}) at ${msg.createdAt}: ${msg.content}`).join('\n')}
  `;

  return sendToGrok(message);
}

const sendToGrok = async (message) => {
  const body = getBodyForMessage(message);
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    console.log("Error sending to Grok:", response.status, response.statusText);
    if (response.status === 429) {
      const response = await fetch('https://openrouter.ai/api/v1/auth/key', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.GROK_KEY}`
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    }
    return "[no response]";
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

module.exports = {
  getGrokResponse
}