<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'stock',
        'sku',
        'category_id',
        'description',
        'thumbnail'
    ];

    public function metadata(){
        return $this->hasMany(ProductMetaData::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }
}