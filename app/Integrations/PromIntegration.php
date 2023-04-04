<?php

namespace App\Integrations;

use App\Integrations\IntegrationInterface;
use App\Models\Integration;
use Illuminate\Support\Facades\Http;

abstract class PromIntegration implements IntegrationInterface{
    public static function setAuthorizedToken(){
        $token = Integration::find(1)->integraion_data()->where('key', 'tokenAPI')->get();

        $http_request = Http::withToken($token[0]->value);

        return $http_request;
    }

    public static function getAllOrders(){
        $response = PromIntegration::setAuthorizedToken()->acceptJson()->get('https://my.sundukmod.store/api/v1/orders/list');

        return $response->throw()->json();
    }
}