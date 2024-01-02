
import CartItem from "../Components/card/CartItem";
import { useLocation } from "react-router-dom";

function Cart(){

const location = useLocation();

const data = location.state;
const {allCart , cartItem} = data;



    return (
        <div className="w-full min-h-[100vh] overflow-x-hidden bg-[#111827] flex flex-col items-center gap-5  py-4">

            <h2 className="text-white font-[600] text-[24px]">MY Cart</h2>
            

                {
                    allCart.length > 0 ?(
                        <div className="flex flex-wrap gap-4 justify-center">
                          {
                            allCart.map((product)=>(
                                <CartItem product={product} key={product.id} />
                            ))
                          }
                        </div>
                    ):(
                        <div>
                            No Cart Item Present
                        </div>
                    )
                }


                 <div className="flex flex-wrap justify-evenly gap-[20px] px-10 w-full ">

                  <p className="text-white font-[500]">total: {cartItem?.total}</p>
                  <p className="text-white font-[500]">discountTotal: {cartItem?.discountedTotal}</p>
                  <p className="text-white font-[500]">userId: {cartItem?.userId}</p>
                  <p className="text-white font-[500]">totalProducts: {cartItem?.totalProducts}</p>
                  <p className="text-white font-[500]">totalQuantity: {cartItem?.totalQuantity}</p>

                 </div>
        </div>
    )
}

export default Cart;