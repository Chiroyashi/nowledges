<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class ChatFilter extends Model
{
    protected $primaryKey = 'conversation_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'conversation_id',
        'field_id',
        'methodology_id',
        'indexing_id',
        'start_year',
        'end_year',
        'language_id'
    ];
}
