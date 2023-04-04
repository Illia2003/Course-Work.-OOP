<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\IntegrationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\WorkerController;
use App\Http\Integration\PromIntegration;
use App\Models\Client;
use App\Models\Order;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('login.get');

Route::prefix('dashboard')->name('dashboard.')->middleware(['auth', 'verified'])->group(function(){
    Route::resource("clients", ClientController::class);

    Route::resource("orders", OrderController::class);

    Route::resource("products", ProductController::class);

    Route::resource("categories", CategoryController::class);

    Route::resource("workers", WorkerController::class);

    Route::get("/integrations", [IntegrationController::class, "index"])->name('integrations.index');

    Route::get("/integrations/{integration}", [IntegrationController::class, "edit"])->name('integrations.edit');

    Route::put("/integrations/{integration}", [IntegrationController::class, "update"])->name('integrations.update');

    Route::get("/analytics", function() {
        $orders_current_month = Order::whereMonth(
            'created_at', date('m'),
        )->get();

        $orders = [];  
        $current_date = new DateTime('now');

        for($i = 6; $i >= 1; $i--){
            $orders_current = Order::whereMonth(
                'created_at', $current_date->format('m')
            )->whereYear(
                'created_at', $current_date->format('Y')
            )->get();

            $orders[$current_date->format('m-Y')] = count($orders_current);

            $current_date->modify("-1 month");
        }

        return Inertia::render("Dashboard/Analytics/Index", [
            'ordersCurrentMonth' => $orders_current_month,
            'ordersMonths' => $orders,
        ]);
    })->name('analytics.index');

    Route::get('/', function () {
        $new_orders = Order::orderBy('created_at', 'desc')->take(5)->get();

        $new_clients = Client::orderBy('created_at', 'desc')->take(5)->get();

        return Inertia::render('Dashboard/Dashboard', [
            'newOrders' => $new_orders,
            'newClients' => $new_clients
        ]);
    })->name('welcome');
});

require __DIR__.'/auth.php';