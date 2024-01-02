import toast from "react-hot-toast";
import { productEndpoints } from "../../services/apis";

function SingleCard({product ,setCartItem ,setAllCart , setTotalCart}){

    const {brand , category , description , price , rating , thumbnail,title , stock   ,id  } = product;

     const addToCart = async()=>{

        const toastId = toast.loading("Loading...");
            try{

                const response = await fetch(productEndpoints.ADD_TO_CART ,{
                    method: 'POST',
                    headers:
                     { 'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({
                      userId: 15,
                      products: [
                        {
                          id: 1,
                          quantity: 1,
                        },
                        {
                          id: 50,
                          quantity: 2,
                        },
                      ]
                    })
                });

if(response.status === 200){

    const data =await response.json();
   
    console.log("data" , data);

    setCartItem(data);
    
    setAllCart(data?.products);
    
    setTotalCart(data?.products.length);
    toast.success("succesfuly added");
}
else{
    toast.error("something went wrong");
}

            } catch(error){
                console.log(error);
            }

            toast.dismiss(toastId);
     }

    return (
         <div className="w-[350px] singleCard  pb-4 bg-gray-600 flex flex-col gap-[10px]">

            <img src={thumbnail} loading="lazy" className="h-[200px] w-full" alt="" />

            <div className="flex flex-col gap-[10px] justify-between  min-h-[200px]">

           

            <div className="flex justify-between px-2 h- ">
                <p className="text-[14px] font-[600] text-white ">{title}</p>
                <p className="text-[12px] text-white">{category}</p>
            </div>

            <p className="text-[12px] px-2 text-white font-[400]">{description}</p>

            <div className="flex justify-between px-2  ">
                <p className="text-[14px] text-white font-[500] ">price: {price}</p>
                <p className="text-[14px] text-white font-[500]">stock: {stock}</p>
                
            </div>

            <div className="flex justify-between px-2  text-white font-[600] text-[14px]">
                <p className="">brand: {brand}</p>
                <p className=""> rating: {rating}</p>

            </div>
                 
                 <div className="w-full  text-center">

            <button onClick={addToCart} className="bg-red-300 hover:bg-red-500 transition-all duration-200 px-3 py-2 rounded-md ">
                All to Cart
            </button>

            </div>
                 </div>

        </div>
    )
}

export default SingleCard;