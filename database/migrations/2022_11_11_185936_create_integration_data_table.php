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
        Schema::create('integration_data', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("integration_id");
            $table->string("key");
            $table->string("name");
            $table->string("value");

            $table->foreign("integration_id")->references("id")->on("integrations")->coconstrained()->onUpdate("cascade")->onDelete("cascade");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('integration_data');
    }
};