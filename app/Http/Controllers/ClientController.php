<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index(){
        $clients = Client::all();

        return Inertia::render("Dashboard/Clients/Index",[
            "clients" => $clients
        ]);
    }

    public function show(Client $client){
        return Inertia::render("Dashboard/Clients/Show", [
            "client" => $client->load(["orders"])
        ]);
    }

    public function create(){
        return Inertia::render("Dashboard/Clients/Create");
    }

    public function store(Request $request){
        $attributes = $request->validate([
            //"first_name" => ["required","regex:/^([A-Za-zА-Яа-яіІ]+|\d+)$/"],
            //"last_name" => ["required","regex:/^([A-Za-zА-Яа-яіІ]+|\d+)$/"],
            "first_name" => ["required"],
            "last_name" => ["required"],
            "phone" => "required|unique:clients,phone",
            "email" => "required|unique:clients,email|email"
        ]);

        $client = new Client($attributes);

        $client->save();

        return redirect()->route("dashboard.clients.index");
    }

    public function edit(Client $client){
        return Inertia::render("Dashboard/Clients/Edit", [
            'client' => $client
        ]);
    }

    public function update(Request $request, Client $client){
        $attributes = $request->validate([
            //"first_name" => ["required","regex:/^([A-Za-zА-Яа-яіІ]+|\d+)$/"],
            //"last_name" => ["required","regex:/^([A-Za-zА-Яа-яіІ]+|\d+)$/"],
            "first_name" => ["required"],
            "last_name" => ["required"],
            "phone" => "required|unique:clients,phone,".$client->id,
            "email" => "required|email|unique:clients,email,".$client->id
        ]);

        $client->update($attributes);

        return redirect()->route("dashboard.clients.index");
    }

    public function destroy(Client $client){
        $client->delete();

        return redirect()->route("dashboard.clients.index");
    }
}