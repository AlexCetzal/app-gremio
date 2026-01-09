<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
        'event_type',
        'amount',
        'responsible_id',
        'date',
        'notes'
    ];

    public function responsible() {
        return $this->belongsTo(Collaborator::class, 'responsible_id');
    }
}

