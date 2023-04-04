<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'user_id',
        'order_status_id',
        'shipping_method_id',
        'total'
    ];

    public function client(){
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function status(){
        return $this->belongsTo(OrderStatus::class, 'order_status_id');
    }

    public function shipping_method(){
        return $this->belongsTo(ShippingMethod::class, 'shipping_method_id');
    }

    public function order_meta(){
        return $this->hasMany(OrderMetaData::class, 'order_id');
    }

    public function products(){
        return $this->hasMany(OrderProducts::class, 'order_id');
    }
}