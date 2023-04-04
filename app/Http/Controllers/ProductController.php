<?php

namespace App\Http\Controllers;
use App\Helper\Imageable;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductMetaData;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    use Imageable;

    public function index(){
        $products = Product::all();

        return Inertia::render("Dashboard/Products/Index", [
            'products' => $products,
        ]);
    }

    public function show(Product $product){
        return Inertia::render("Dashboard/Products/Show", [
            "product" => $product,
            "metadata" => $product->metadata,
            "category" => $product->category
        ]);
    }

    public function create(){
        $categories = Category::all();
        return Inertia::render("Dashboard/Products/Create", [
            'categories' => $categories
        ]);
    }

    public function store(Request $request){
        $attributes = $request->validate([
            "sku" => "required|unique:products,sku",
            "name" => "required",
            "description" => "string",
            "stock" => "integer",
            "category_id" => "integer",
            "price" => "numeric",
            "thumbnail" => "image"
        ]);

        $image = $this->storeMedia($request, "thumbnail");
        $attributes['thumbnail'] = $image->url;

        $product = new Product($attributes);

        $product->save();

        $meta_data = $request->get("metadata");
        if(count($meta_data)){
            foreach($meta_data as $item){
                if(!empty($item['name']) && !empty($item['value'])){
                    $item['product_id'] = $product->id;
                    $meta_data_object = new ProductMetaData($item);
                    
                    $meta_data_object->save();
                }
            }
        }

        return redirect()->route("dashboard.products.index");
    }
    
    public function edit(Product $product){
        return Inertia::render("Dashboard/Products/Edit", [
            "product" => $product,
            "metadata" => $product->metadata,
            "category" => $product->category,
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, Product $product){
        $attributes = $request->validate([
            "sku" => "required|unique:products,sku,".$product->id,
            "name" => "required",
            "description" => "string|nullable",
            "stock" => "integer",
            "price" => "numeric",
            "category_id" => "integer",
            "thumbnail" => "image|nullable"
        ]);

        if(!empty($attributes['thumbnail'])){
            $image = $this->storeMedia($request, "thumbnail");
            $attributes['thumbnail'] = $image->url;
        }else{
            $attributes['thumbnail'] = $product->thumbnail;
        }

        $product->update($attributes);

        $meta_data = $request->get("metadata");
        if(count($meta_data)){
            foreach($meta_data as $item){
                if(!empty($item['name']) && !empty($item['value'])){
                    if(!empty($item['id'])){
                        $meta_data_object = ProductMetaData::find($item['id']);

                        $meta_data_object->update([
                            'name' => $item['name'],
                            'value' => $item['value'],
                        ]);
                    }else{
                        $item['product_id'] = $product->id;
                        $meta_data_object = new ProductMetaData([
                            'product_id' => $product->id,
                            'name' => $item['name'],
                            'value' => $item['value'],
                        ]);
                        
                        $meta_data_object->save();
                    }
                }
            }
        }

        return redirect()->route("dashboard.products.index");
    }

    public function destroy(Product $product){
        $product->delete();

        return redirect()->route("dashboard.products.index");
    }
}