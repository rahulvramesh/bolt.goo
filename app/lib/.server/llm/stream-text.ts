import { streamText as _streamText, convertToCoreMessages } from 'ai';
import { getAPIKey, getGoogleStudioAPIKey } from '~/lib/.server/llm/api-key';
import { getAnthropicModel, getGoogleModel } from '~/lib/.server/llm/model';
import { MAX_TOKENS } from './constants';
import { getSystemPrompt } from './prompts';

interface ToolResult<Name extends string, Args, Result> {
  state: 'result';
  toolCallId: string;
  toolName: Name;
  args: Args;
  result: Result;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  toolInvocations?: ToolResult<string, unknown, unknown>[];
}

export type Messages = Message[];

export type StreamingOptions = Omit<Parameters<typeof _streamText>[0], 'model'>;

export function streamText(messages: Messages, env: Env, options?: StreamingOptions) {
  console.log('Starting streamText with messages:', JSON.stringify(messages, null, 2));
  console.log('StreamingOptions:', JSON.stringify(options, null, 2));

  const model = getGoogleModel(getGoogleStudioAPIKey(env));
  console.log('Using model:', model);

  const systemPrompt = getSystemPrompt();
  console.log('System prompt:', systemPrompt);

  const coreMessages = convertToCoreMessages(messages);
  console.log('Converted core messages:', JSON.stringify(coreMessages, null, 2));

  try {
    const result = _streamText({
      model,
      system: systemPrompt,
      messages: coreMessages,
      ...options,
    });

    console.log('Stream created successfully');
    return result;
  } catch (error) {
    console.error('Error in streamText:', error);
    throw error;
  }
}