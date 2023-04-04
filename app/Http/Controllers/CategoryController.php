<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(){
        $categories = Category::all();

        return Inertia::render("Dashboard/Categories/Index", [
            'categories' => $categories
        ]);
    }

    public function create(){
        return Inertia::render("Dashboard/Categories/Create");
    }

    public function store(Request $request){
        $attributes = $request->validate([
            'name' => 'required'
        ]);

        $category = new Category($attributes);

        $category->save();

        return redirect()->route('dashboard.categories.index');
    }

    public function edit(Category $category){
        return Inertia::render("Dashboard/Categories/Edit", [
            "category" => $category
        ]);
    }

    public function update(Request $request, Category $category){
        $attributes = $request->validate([
            'name' => 'required'
        ]);

        $category->update($attributes);

        return redirect()->route('dashboard.categories.index');
    }

    public function destroy(Category $category){
        $category->delete();

        return redirect()->route('dashboard.categories.index');
    }
}