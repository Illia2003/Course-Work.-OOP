<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Integration;
use App\Models\Order;
use App\Models\OrderMetaData;
use App\Models\OrderProducts;
use App\Models\OrderStatus;
use App\Models\Product;
use App\Models\ShippingMethod;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(){
        return Inertia::render("Dashboard/Orders/Index", [
            'orders' => Order::all()->load(['client', 'status'])
        ]);
    }

    public function show(Order $order){
        $order->load(['client', 'user', 'status', 'shipping_method', 'order_meta', 'products']);

        foreach($order->products as $order_item){
            $order_item->load(['product']);
        }

        return Inertia::render("Dashboard/Orders/Show", [
            'order' => $order,
        ]);
    }

    public function create(){
        $user = User::find(Auth::id());

        $nova_poshta_integration = Integration::find(2);
        $nova_poshta_key = Integration::find(2)->integraion_data()->where('key', 'apiKey')->get();

        if(empty($user->parent_id)){
            $users = User::where("parent_id", Auth::id())->get();
        }else{
            $users = User::where("parent_id", $user->parent_id)->get();
        }

        return Inertia::render("Dashboard/Orders/Create", [
            'clients' => Client::all(),
            'products' => Product::all(),
            'users' => $users,
            'shipping_methods' => ShippingMethod::all(),
            "nova_poshta" => [
                "is_active" => $nova_poshta_integration->is_active,
                "apiKey" => $nova_poshta_key[0]->value
            ]
        ]);
    }

    public function store(Request $request){
        $attributes = $request->validate([
            'client_id' => 'required|integer',
            'user_id' => 'required|integer',
            'shipping_method_id' => 'required|integer',
            'shipping_region' => 'required|string',
            'shipping_city' => 'required|string',
            'shipping_address_1' => 'required|string',
            'shipping_address_2' => 'required|string',
            'shipping_postcode' => 'required|string',
        ]);

        $total = 0;
        foreach($request->items as $item){
            $total += $item['price'] * $item['quantity'];
        }

        $order = Order::create([
            'client_id' => $attributes['client_id'],
            'user_id' => $attributes['user_id'],
            'shipping_method_id' => $attributes['shipping_method_id'],
            'order_status_id' => '1',
            'total' => $total
        ]);

        OrderMetaData::insert([
            [
                "order_id" => $order->id,
                'key' => 'shipping_region',
                "name" => "Область",
                "value" => $attributes['shipping_region'],
            ],
            [
                "order_id" => $order->id,
                'key' => 'shipping_city',
                "name" => "Населений пункт",
                "value" => $attributes['shipping_city'],
            ],
            [
                "order_id" => $order->id,
                'key' => 'shipping_address_1',
                "name" => "Адреса",
                "value" => $attributes['shipping_address_1'],
            ],
            [
                "order_id" => $order->id,
                'key' => 'shipping_address_2',
                "name" => "Квартира, під'їзд",
                "value" => $attributes['shipping_address_2'],
            ],
            [
                "order_id" => $order->id,
                'key' => 'shipping_postcode',
                "name" => "Індекс",
                "value" => $attributes['shipping_postcode'],
            ],
        ]);

        foreach($request->items as $item){
            if($item['quantity'] != 0){
                OrderProducts::create([
                    "order_id" => $order->id,
                    "product_id" => $item['product_id'],
                    "quantity" => $item['quantity'],
                    "total" => $item['price'] * $item['quantity'],
                ]);
            }
        }

        return redirect()->route('dashboard.orders.index');
    }

    public function edit(Order $order){
        $user = User::find(Auth::id());

        if(empty($user->parent_id)){
            $users = User::where("parent_id", Auth::id())->get();
        }else{
            $users = User::where("parent_id", $user->parent_id)->get();
        }

        return Inertia::render("Dashboard/Orders/Edit", [
            'clients' => Client::all(),
            'order' => $order->load(["order_meta", "products"]),
            'products' => Product::all(),
            'users' => $users,
            'shipping_methods' => ShippingMethod::all(),
            'order_statuses' => OrderStatus::all(),
        ]);
    }

    public function update(Request $request, Order $order){
        $attributes = $request->validate([
            'client_id' => 'required|integer',
            'user_id' => 'required|integer',
            'order_status_id' => 'required|integer',
            'shipping_method_id' => 'required|integer',
            'shipping_region' => 'required|array',
            'shipping_city' => 'required|array',
            'shipping_address_1' => 'required|array',
            'shipping_address_2' => 'required|array',
            'shipping_postcode' => 'required|array',
            'items' => 'array',
        ]);

        $total = 0;
        foreach($request->items as $item){
            $total += $item['price'] * $item['quantity'];
        }

        $order->update([
            'client_id' => $attributes['client_id'],
            'user_id' => $attributes['user_id'],
            'shipping_method_id' => $attributes['shipping_method_id'],
            'order_status_id' => $attributes['order_status_id'],
            'total' => $total
        ]);

        OrderMetaData::find($attributes['shipping_region']['id'])->update([
            'value' => $attributes['shipping_region']['value']
        ]);

        OrderMetaData::find($attributes['shipping_city']['id'])->update([
            'value' => $attributes['shipping_city']['value']
        ]);

        OrderMetaData::find($attributes['shipping_address_1']['id'])->update([
            'value' => $attributes['shipping_address_1']['value']
        ]);

        OrderMetaData::find($attributes['shipping_address_2']['id'])->update([
            'value' => $attributes['shipping_address_2']['value']
        ]);

        OrderMetaData::find($attributes['shipping_postcode']['id'])->update([
            'value' => $attributes['shipping_postcode']['value']
        ]);

        foreach($request->items as $item){
            if($item['quantity'] != 0 && $item['product_id'] != 0){
                if(!isset($item['id'])){
                    OrderProducts::create([
                        "order_id" => $order->id,
                        "product_id" => $item['product_id'],
                        "quantity" => $item['quantity'],
                        "total" => $item['price'] * $item['quantity'],
                    ]);
                }else{
                    OrderProducts::find($item['id'])->update([
                        "order_id" => $order->id,
                        "product_id" => $item['product_id'],
                        "quantity" => $item['quantity'],
                        "total" => $item['price'] * $item['quantity'],
                    ]);
                }
            }
        }

        return redirect()->route('dashboard.orders.index');
    }

    public function destroy(Order $order){
        $order->delete();

        return redirect()->route("dashboard.orders.index");
    }
}