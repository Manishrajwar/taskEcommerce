function CartItem({product}){

    const {discountPercentage, discountedPrice , price,quantity ,  thumbnail ,  title , total} = product;

    return (
        <div className="w-[350px] singleCard bg-gray-600 pb-4">

        <img src={thumbnail} loading="lazy" className="h-[200px] w-full" alt="" />

        <div className="flex justify-between px-2 text-white font-[600] py-2">
            <p className="text-[14px]">{title}</p>
            <p className="text-[14px]">Quantity: {quantity}</p>
        </div>

        <p className="text-[14px] text-white font-[600] my-3 px-2">discount: {discountedPrice}</p>

        <div className="flex justify-between px-2 my-2 text-white">
            <p className="text-[14px] font-[700] ">Price: {price}</p>
            <p className="text-[14px] font-[600]">DiscountPercentage: {discountPercentage}</p>
            
        </div>
        <div className="flex justify-between px-2">
            <p className=" text-white font-[600]">Total: {total}</p>

        </div>

    </div>
    )
}

export default CartItem;