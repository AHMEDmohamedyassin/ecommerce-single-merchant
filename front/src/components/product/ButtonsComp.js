import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Cart_AddingAction } from '../../redux/action/CartAction';
import { Favorite_SyncAction } from '../../redux/action/FavoriteAction';
import { useNavigate } from 'react-router-dom';

const ButtonsComp = () => {
  const state = useSelector(state => state.ProductReducer)
  const cart = useSelector(state => state.CartReducer)
  const auth = useSelector(state => state.AuthReducer)
  const dispatch = useDispatch()
  const [selectedQuantity , setSelectedQuantity] = useState(0)     // quantity placed in cart from selected product
  const navigate = useNavigate()

  // adding item to cart
  const addToCart = () => {
    if(!auth.token)
      return navigate(`/auth/login?redirect=/product/${state.id}/${encodeURIComponent(state.slug)}`);

    dispatch(Cart_AddingAction(state.selected_product?.id))
    dispatch({type:"Cart_Data" , data : {side_cart : true}})      // opening side cart on adding product
  } 

  // sync product to favorite
  const handleFavoriteSync = () => {
    dispatch(Favorite_SyncAction())
  }

  useEffect(() => {
    setSelectedQuantity(cart.items.find(e => e.id == state.selected_product?.id)?.pivot?.quantity ?? 0)
  } , [state.selected_product , cart.items])
  return (
    <>
      <div className='flex flex-col w-full gap-4 flex-1 justify-end'>

        <div className='flex gap-4 max-sm:flex-col'>

          {/* favorite button  */}
          <button onClick={handleFavoriteSync} className='p-1 px-2 text-xs font-semibold rounded-lg custom-border text-maincolor'>
            <span className={`${state.is_favorite ? "fill" : ""} hoverfill material-symbols-outlined text-xl`}>favorite</span>
          </button>

          {/* add to cart button */}
          <button onClick={addToCart} disabled={!state.selected_product?.quantity || selectedQuantity >= state.selected_product?.quantity} className='disabled:bg-secondarycolor/50 disabled:cursor-not-allowed flex-1 flex items-center justify-center gap-2 sm:col-span-3 col-span-4 bg-secondarycolor text-white py-1 text-xs font-semibold rounded-lg custom-border hover:bg-maincolor'>
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
            {
              selectedQuantity && !(selectedQuantity >= state.selected_product?.quantity) ?
              <span>أضف قطعة أخري إلي السلة تم إضافة {selectedQuantity} قطع </span> : 
              selectedQuantity && selectedQuantity >= state.selected_product?.quantity ?
                <span>لا يمكن إضافة أكثر من {selectedQuantity} قطع</span> :
                <span>أضف إلي السلة</span>
            }
          </button>

        </div>
        

        {/* buying button */}
        <>
          {
            auth.token ? 
            state.selected_product?.quantity ? (
              // <button className='max-sm:order-3 flex items-center justify-center gap-2 col-span-4 bg-black text-white py-1 text-xs font-semibold rounded-lg custom-border hover:bg-secondarycolor'>
              //   <span className="material-symbols-outlined text-xl">shopping_cart</span>
              //   <span>اشتري الان</span>
              // </button>
              <></>
            ) : <span className='bg-gray-300 text-white py-3 text-xs font-semibold rounded-lg custom-border  text-center '>غير متوفر</span>
            :null
          }
        </>

      </div>
    </>
  )
}

export default ButtonsComp