import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

const OrderTotalComp = () => {
    const state = useSelector(state => state.OrderReducer)
    const totalValue = useMemo(() => {
        const totalProducts = state.products?.reduce((sum, e) => sum + (e.count * e.price), 0) ?? 0;
        const totalAdditional = state.additional?.reduce((sum, e) => e.price ? sum + (e.quantity * e.price) : sum, 0) ?? 0;
        const totalCoupon = state.coupon?.value ?? 0;
        const totalValue = totalProducts + totalAdditional - totalCoupon
        if(totalValue > 0)
            return totalValue;
        return 0
    }, [state.products, state.additional, state.coupon]);

  return (
        <div className='custom-table w-fit mx-0'>
            <div className='custom-tablerow bg-mainbg'>
                <p className='w-80 flex justify-between'>
                    <span>عدد القطع : </span>
                    <span>{
                    (state.products?.reduce((sum , e) => sum + e.count , 0) + 
                    state.additional?.reduce((sum , e) => e.quantity ? sum + e.quantity : sum , 0)
                    ) ?? "لا يوجد منتجات"}</span>
                </p>
            </div>
            <div className='custom-tablerow bg-mainbg'>
                <p className='w-80 flex justify-between'>
                    <span>عدد المنتجات : </span>
                    <span>{state.products?.length + state.additional?.length ?? "لا يوجد منتجات"}</span>
                </p>
            </div>
            {
                state.coupon ? (
                    <div className='custom-tablerow bg-mainbg'>
                        <p className='w-80 flex justify-between'>
                            <span>خصم الكوبون :</span>
                            <span>{state.coupon.value} - </span>
                        </p>
                    </div>
                ) : null
            }
            <div className='custom-tablerow bg-mainbg'>
                <p className='w-80 flex justify-between'>
                    <span>الإجمالي :</span>
                    <span>{totalValue}</span>
                </p>
            </div>
        </div>
  )
}

export default OrderTotalComp