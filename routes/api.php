<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ChatbotController;
use App\Http\Controllers\Api\ChatFilterController;
use App\Http\Controllers\Api\ChatStatisticsController;

Route::post('/chat', [ChatbotController::class, 'createConversation']);
Route::get('/chat', [ChatbotController::class, 'conversations']);
Route::get('/chat/{conversationId}/messages', [ChatbotController::class, 'messages']);
Route::post('/chat/{conversationId}/send', [ChatbotController::class, 'sendMessage']);

Route::put('/chat/{conversationId}/filter', [ChatFilterController::class, 'update']);
Route::get('/chat/{conversationId}/stats', [ChatStatisticsController::class, 'stats']);
