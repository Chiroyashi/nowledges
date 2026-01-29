<?php
// app/Http/Controllers/ChatController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Chat;
use App\Models\Message;

class ChatController extends Controller
{
    /**
     * Get user's chat history
     */
    public function getHistory(Request $request)
    {
        // Get chats from database
        $chats = Chat::where('user_id', auth()->id())
            ->orderBy('updated_at', 'desc')
            ->limit(10)
            ->pluck('title')
            ->toArray();

        // Return fallback data if no chats found
        if (empty($chats)) {
            return response()->json([
                'Dampak AI pada Dosen',
                'Metodologi Kualitatif Kom',
                'Lorem Ipsum Dolor Sit Am',
            ]);
        }

        return response()->json($chats);
    }

    /**
     * Create a new chat session
     */
    public function createNewChat(Request $request)
    {
        $chat = Chat::create([
            'user_id' => auth()->id(),
            'title' => 'New Chat',
        ]);

        return response()->json([
            'success' => true,
            'chat_id' => $chat->id,
        ]);
    }

    /**
     * Send message and get AI response
     */
    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:5000',
            'chat_id' => 'nullable|exists:chats,id',
        ]);

        $message = $request->input('message');
        $chatId = $request->input('chat_id');

        // Save user message to database
        if ($chatId) {
            Message::create([
                'chat_id' => $chatId,
                'sender' => 'user',
                'content' => $message,
            ]);
        }

        // Call AI API (example with OpenAI)
        try {
            $response = $this->getAIResponse($message);
            
            // Save AI response to database
            if ($chatId) {
                Message::create([
                    'chat_id' => $chatId,
                    'sender' => 'ai',
                    'content' => $response,
                ]);
            }

            return response()->json([
                'success' => true,
                'response' => $response,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'response' => 'Sorry, I encountered an error processing your request.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get AI response from your chosen AI service
     */
    private function getAIResponse($message)
    {
        // Example: OpenAI API
        $apiKey = env('OPENAI_API_KEY');
        
        if (!$apiKey) {
            return 'This is a mock response. Please configure your AI API key.';
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $apiKey,
            'Content-Type' => 'application/json',
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'You are Nowledge, a helpful assistant.'
                ],
                [
                    'role' => 'user',
                    'content' => $message
                ]
            ],
            'max_tokens' => 1000,
        ]);

        if ($response->successful()) {
            $data = $response->json();
            return $data['choices'][0]['message']['content'];
        }

        throw new \Exception('AI API request failed');
    }

    /**
     * Get specific chat with messages
     */
    public function getChat($id)
    {
        $chat = Chat::with('messages')
            ->where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        return response()->json($chat);
    }

    /**
     * Delete a chat
     */
    public function deleteChat($id)
    {
        $chat = Chat::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $chat->delete();

        return response()->json([
            'success' => true,
            'message' => 'Chat deleted successfully',
        ]);
    }
}