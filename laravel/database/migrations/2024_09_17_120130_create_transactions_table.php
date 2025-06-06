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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable();
            $table->foreignId('order_id')->nullable();
            $table->char('gateway_name' , 20)->nullable();
            $table->unsignedFloat('cart_total')->default(0);
            $table->char('invoice_status' , 20)->default('pending')->nullable();
            $table->char('payment_method' , 100)->nullable();
            $table->dateTime('paid_at')->nullable();
            $table->string('invoice_id')->nullable();
            $table->string('invoice_key')->nullable();
            $table->char('currency' , 20)->nullable();
            $table->string('referenceNumber')->nullable();
            $table->string('hashKey')->nullable();
            $table->string('pay_load')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
