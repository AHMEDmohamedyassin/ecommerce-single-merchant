<?php

namespace App\Listeners;

use App\Events\OrderStatusEvent;
use App\Models\Product;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class OrderStatusListener
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
    public function handle(OrderStatusEvent $event): void
    {
        if(!in_array($event->status , ['success' , 'canceled' , 'canceled without refund']))
            return ;

        if($event->order->status == $event->status)
            return ;
        
        // update order status
        $event->order->update([
            'status' => $event->status
        ]);

        // update products order 
        $products = $event->order->product;

        foreach($products as $product){
            $new_quantity = 0;

            if($event->status == 'success')
                $new_quantity = $product->paid_quantity + $product->pivot->quantity;
            else 
                $new_quantity = $product->paid_quantity - $product->pivot->quantity;

            Product::find($product->id)->update([
                'paid_quantity' => $new_quantity
            ]);
        }
    }
}
