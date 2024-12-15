import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI, google } from '@ai-sdk/google';

export function getAnthropicModel(apiKey: string) {
  const anthropic = createAnthropic({
    apiKey,
  });

  return anthropic('claude-3-5-sonnet-20240620');
}


export function getGoogleModel(apiKey: string) {


  const google = createGoogleGenerativeAI({
    apiKey,
  });

  return google('gemini-2.0-flash-exp', {});
} 
