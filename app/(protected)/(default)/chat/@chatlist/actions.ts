'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { elysia } from '@/treaty';

const createChatSchema = z.object({
  userId: z.string(),
  participantId: z.string(),
});

export type CreateChatBody = z.infer<typeof createChatSchema>;

export const createChatAction = actionClient
  .inputSchema(createChatSchema)
  .action(async ({ parsedInput }) => {
    const { data: response } = await elysia.chat.post(parsedInput);

    if (!response) {
      return {
        status: 'error',
        message: 'Failed to create chat',
        data: {
          id: null,
        },
      };
    }

    return response;
  });
