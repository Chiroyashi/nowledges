<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\ChatFilter;
use App\Models\Conversation;
use Illuminate\Http\Request;

class ChatStatisticsController extends Controller
{
    public function stats(Request $request, $conversationId)
    {
        $conversation = Conversation::where('conversation_id', $conversationId)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $filter = ChatFilter::where('conversation_id', $conversation->id)->first();

        $query = Article::query();

        if ($filter?->field_id) {
            $query->where('field_id', $filter->field_id);
        }

        if ($filter?->methodology_id) {
            $query->where('methodology_id', $filter->methodology_id);
        }

        if ($filter?->indexing_id) {
            $query->where('indexing_id', $filter->indexing_id);
        }

        if ($filter?->language_id) {
            $query->where('language_id', $filter->language_id);
        }

        if ($filter?->start_year && $filter?->end_year) {
            $query->whereBetween('year', [
                $filter->start_year,
                $filter->end_year
            ]);
        }

        $stats = $query
            ->selectRaw('year, COUNT(*) as total')
            ->groupBy('year')
            ->orderBy('year')
            ->get();

        return response()->json([
            'stats' => $stats
        ]);
    }
}
