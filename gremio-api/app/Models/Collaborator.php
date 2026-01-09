<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collaborator extends Model
{
    protected $fillable = ['name', 'phone', 'notes'];

    public function contributions() {
        return $this->hasMany(Contribution::class);
    }

    public function donations() {
        return $this->hasMany(Donation::class);
    }

    public function sales() {
        return $this->hasMany(Sale::class, 'responsible_id');
    }

    public function expenses() {
        return $this->hasMany(Expense::class, 'responsible_id');
    }
}

