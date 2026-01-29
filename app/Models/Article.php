<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title',
        'abstract',
        'year',
        'field_id',
        'methodology_id',
        'indexing_id',
        'language_id',
        'source'
    ];
}
