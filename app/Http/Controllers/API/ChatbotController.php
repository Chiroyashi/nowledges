<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\ChatFilter;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ChatbotController extends Controller
{
    public function createConversation(Request $request)
    {
        $sessionId = $request->header('X-Session-Id') ?? Str::uuid()->toString();

        $conversation = Conversation::create([
            'session_id' => $sessionId,
            'title' => $request->title ?? 'New Chat',
        ]);

        ChatFilter::create([
            'conversation_id' => $conversation->conversation_id
        ]);

        return response()->json([
            'conversation' => $conversation,
            'session_id' => $sessionId
        ]);
    }

    public function conversations(Request $request)
    {
        $sessionId = $request->header('X-Session-Id');

        return Conversation::where('session_id', $sessionId)
            ->latest()
            ->get();
    }

    public function messages(Request $request, $conversationId)
    {
        $sessionId = $request->header('X-Session-Id');

        $conversation = Conversation::where('conversation_id', $conversationId)
            ->where('session_id', $sessionId)
            ->firstOrFail();

        return Message::where('conversation_id', $conversation->conversations_id)
            ->orderBy('created_at')
            ->get();
    }

    public function sendMessage(Request $request, $conversationId)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $sessionId = $request->header('X-Session-Id');

        $conversation = Conversation::where('conversation_id', $conversationId)
            ->where('session_id', $sessionId)
            ->firstOrFail();

        $userMessage = Message::create([
            'conversation_id' => $conversation->id,
            'sender' => 'user',
            'content' => $request->input('content'),
        ]);

        $botReply = Message::create([
            'conversation_id' => $conversation->id,
            'sender' => 'bot',
            'content' => 'Ini balasan bot (dummy)',
        ]);

        return response()->json([
            'user_message' => $userMessage,
            'bot_message' => $botReply,
        ]);
    }
}
