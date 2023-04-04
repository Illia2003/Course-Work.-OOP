<?php

namespace App\Http\Controllers;

use App\Integrations\NovaPoshtaIntegration;
use App\Models\Integration;
use App\Models\IntegrationData;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IntegrationController extends Controller
{
    public function index(){
        return Inertia::render("Dashboard/Integrations/Index", [
            'integrations' => Integration::all(),
        ]);
    }

    public function edit(Integration $integration){
        return Inertia::render($integration->path_to_template, [
            'integration' => $integration,
            'integration_data' => $integration->integraion_data
        ]);
    }

    public function update(Request $request, Integration $integration){
        $request->validate([
            'is_active' => 'boolean',
            'integrationData' => 'array'
        ]);

        $integration->update([
            'is_active' => $request->is_active
        ]);

        foreach($request->integrationData as $key=>$item){
            if(!empty($item['value'])){
                if(isset($item['id'])){
                    IntegrationData::find($item['id'])->update([
                        'value' => $item['value']
                    ]);
                }else{
                    IntegrationData::create([
                        'value' => $item['value'],
                        'name' => $item['name'],
                        'key' => $key,
                        'integration_id' => $integration->id
                    ]);
                }
            }
        }

        return redirect()->route('dashboard.integrations.index');
    }
}