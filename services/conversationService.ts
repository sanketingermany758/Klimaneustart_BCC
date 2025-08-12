
// import { ConversationData } from '../types';

/**
 * Mocks saving the conversation data to a backend.
 * In a real application, this would be a fetch/axios call to a FastAPI endpoint.
 * e.g., await fetch('/api/v1/conversations', { method: 'POST', ... });
 * @param data The conversation data to save.
 */
// export const saveConversation = (data: ConversationData): Promise<{ success: boolean; id: string }> => {
//     console.log("Submitting conversation data to mock backend:", data);

//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             // Simulate a random network failure 10% of the time
//             // if (Math.random() < 0.1) {
//             //     console.error("Mock API Error: Failed to save conversation.");
//             //     reject(new Error("Network error"));
//             // } else {
//             const newId = `session_${Date.now()}`;
//             console.log(`Mock API Success: Conversation saved with ID: ${newId}`);
//             resolve({ success: true, id: newId });
//             // }
//         }, 1000); // Simulate 1 second network delay
//     });
// };


import { ConversationData } from '../types';

// Prefer absolute backend URL only if provided; otherwise use same-origin '/api' path
const API_BASE_URL: string = (import.meta as any).env?.VITE_API_BASE_URL || '';

export const saveConversation = async (
  data: ConversationData & { uuid?: string; sendCopy?: boolean; firstName?: string; lastName?: string; phone?: string }
): Promise<{ success: boolean; id: string }> => {
  try {
    const url = API_BASE_URL
      ? `${API_BASE_URL}/api/v1/conversations`
      : `/api/v1/conversations`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorMsg = 'Failed to save conversation';
      try {
        const error = await response.json();
        errorMsg = error?.error || errorMsg;
      } catch { }
      throw new Error(errorMsg);
    }

    const result = await response.json();
    return { success: true, id: result.dialogue_id || result.id };
  } catch (error) {
    console.error('Network or API error:', error);
    throw error;
  }
};
