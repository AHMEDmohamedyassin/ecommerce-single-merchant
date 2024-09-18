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
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('coupon_encrypt')->nullable();
            $table->string('coupon_hash')->nullable();
            $table->unsignedFloat('value')->default(0);
            $table->boolean('paid')->default(0);
            $table->dateTime('expire_date')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->boolean('is_used')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
