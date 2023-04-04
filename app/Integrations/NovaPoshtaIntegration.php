<?php

namespace App\Integrations;

use App\Integrations\IntegrationInterface;
use App\Models\Integration;
use Illuminate\Support\Facades\Http;

abstract class NovaPoshtaIntegration implements IntegrationInterface{
    public static function setAuthorizedToken(){
        $token = Integration::find(2)->integraion_data()->where('key', 'apiKey')->get();

        return $token[0]->value;
    }

    public static function getAllAreas(){
        $response = Http::acceptJson()->post('https://api.novaposhta.ua/v2.0/json/', [
            'apiKey' => NovaPoshtaIntegration::setAuthorizedToken(),
            "modelName"=> "Address",
            "calledMethod"=> "getAreas",
        ]);

        return $response->json();
    }
}