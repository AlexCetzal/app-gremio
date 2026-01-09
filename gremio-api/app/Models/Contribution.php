<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contribution extends Model
{
    protected $fillable = [
        'collaborator_id',
        'amount',
        'type',
        'date'
    ];

    public function collaborator() {
        return $this->belongsTo(Collaborator::class);
    }
}

