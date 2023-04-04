<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class WorkerController extends Controller
{
    public function index(){
        $users = User::where("parent_id", Auth::id())->get();

        return Inertia::render("Dashboard/Workers/Index", [
            "users" => $users
        ]);
    }

    public function show(User $worker){
        return Inertia::render("Dashboard/Workers/Show", [
            "user" => $worker,
            "role" => $worker->role
        ]);
    }

    public function create(){
        $roles = UserRole::all();
        
        return Inertia::render("Dashboard/Workers/Create", [
            "currentUserId" => Auth::id(),
            'roles' => $roles
        ]);
    }

    public function store(Request $request){
        $attributes = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|unique:users',
            'role_id' => 'required|integer',
            'parent_id' => 'required|integer',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $attributes['password'] = Hash::make($request->password);

        $user = User::create($attributes);

        return redirect()->route('dashboard.workers.index');
    }

    public function edit(User $worker){
        $roles = UserRole::all();
        
        return Inertia::render("Dashboard/Workers/Edit", [
            "currentUser" => $worker,
            'roles' => $roles
        ]);
    }

    public function update(Request $request, User $worker){
        $attributes = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$worker->id,
            'phone' => 'required|unique:users,phone,'.$worker->id,
            'role_id' => 'required|integer',
            'password' => ['confirmed'],
        ]);

        if(!empty($attributes['password'])){
            $attributes['password'] = Hash::make($request->password);
        }else{
            $attributes['password'] = $worker->password;
        }

        $worker->update($attributes);

        return redirect()->route('dashboard.workers.index');
    }

    public function destroy(User $worker){
        $worker->delete();

        return redirect()->route('dashboard.workers.index');
    }
}