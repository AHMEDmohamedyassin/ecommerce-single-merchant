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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('shipping_address_id')->nullable();
            $table->foreignId('billing_address_id')->nullable();
            $table->unsignedFloat('cart_total')->default(0);
            $table->char('currency' , 20)->nullable();
            $table->char('status' , 20)->nullable();
            $table->boolean('pay_on_diliver')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
