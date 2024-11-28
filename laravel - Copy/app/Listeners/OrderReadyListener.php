<?php

namespace App\Listeners;

use App\Events\OrderReadyEvent;
use App\Models\Product;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class OrderReadyListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(OrderReadyEvent $event): void
    {
        $order = $event->order;
    
    
        // update products of order 
        // if(in_array($order->status , ['canceled' , 'canceled without refund'])){
        if(!in_array($order->status , ['ready' , 'success', 'preparing'])){

            $products = $order->product;
    
            foreach($products as $product){
                $order_quantity = $product->pivot->quantity;
    
                $paid_quantity = $product->paid_quantity + $order_quantity;
                $product_quantity = $product->quantity - $order_quantity;
    
                // safe factor against negative values
                if($product_quantity < 0)
                    $product_quantity = 0;
    
                Product::find($product->id)->update([
                    'paid_quantity' => $paid_quantity , 
                    'quantity' => $product_quantity , 
                ]);
            }
        }

        $status = "ready";

        if(in_array($event->status , ["preparing","success"]))
            $status = $event->status;

        // update order status according to pay_on_diliver and status 
        $order->update([
            'status' => $status
        ]);

    }
}
