<?php

namespace App\Listeners;

use App\Events\OrderCancelEvent;
use App\Models\Product;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class OrderCancelListener
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
    public function handle(OrderCancelEvent $event): void
    {
            $order = $event->order;

        
        // update products of order , only effects on products quantity when order is ready , preparing , success 
        if(in_array($order->status , ['ready' , 'preparing' , 'success'])){
            $products = $order->product;
    
            foreach($products as $product){
                $order_quantity = $product->pivot->quantity;
    
                $paid_quantity = $product->paid_quantity - $order_quantity;
                $product_quantity = $product->quantity + $order_quantity;
    
                // safe factor against negative values
                if($paid_quantity < 0)
                    $paid_quantity = 0;
    
                Product::find($product->id)->update([
                    'paid_quantity' => $paid_quantity , 
                    'quantity' => $product_quantity , 
                ]);
            }
        }
        

        $status = !$order->pay_on_diliver && $order->status == 'ready' ? 'canceled without refund' : 'canceled';

        if(in_array($event->status , ["cancel","canceled without refund"]))
            $status = $event->status;

        // update order status according to pay_on_diliver and status 
        $order->update([
            'status' => $status
        ]);

    }
}
