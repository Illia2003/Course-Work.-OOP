<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("client_id");
            $table->unsignedBigInteger("order_status_id");
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("shipping_method_id");

            $table->double("total");

            $table->timestamps();

            $table->foreign("client_id")->references("id")->on("clients")->constrained()->onUpdate("cascade")->onDelete("cascade");
            $table->foreign("order_status_id")->references("id")->on("order_statuses")->constrained()->onUpdate("cascade");
            $table->foreign("user_id")->references("id")->on("users")->constrained()->onUpdate("cascade");
            $table->foreign("shipping_method_id")->references("id")->on("shipping_methods")->constrained()->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};