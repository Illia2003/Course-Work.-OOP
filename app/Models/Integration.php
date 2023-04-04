<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Integration extends Model
{
    use HasFactory;

    protected $fillable = [
        'is_active'
    ];

    public function integraion_data(){
        return $this->hasMany(IntegrationData::class, 'integration_id');
    }
}