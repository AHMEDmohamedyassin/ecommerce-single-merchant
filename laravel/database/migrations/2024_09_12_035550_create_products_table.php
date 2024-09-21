<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->nullable();
            $table->string('serial')->nullable();
            $table->string('title')->nullable();
            $table->string('description')->nullable();
            $table->unsignedFloat('price')->default(0);
            $table->unsignedFloat('old_price')->default(0);
            $table->unsignedSmallInteger('quantity')->default(1);
            $table->unsignedFloat('ratting')->default(0);
            $table->unsignedInteger('views')->default(0);
            $table->unsignedInteger('reviews')->default(0);
            $table->unsignedInteger('paid_quantity')->default(0);
            $table->dateTime('publish_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
