<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    protected $fillable = [
        'collaborator_id',
        'product',
        'quantity',
        'unit',
        'estimated_value',
        'date'
    ];

    public function collaborator() {
        return $this->belongsTo(Collaborator::class);
    }
}
