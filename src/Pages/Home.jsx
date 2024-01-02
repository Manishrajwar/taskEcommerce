import { useEffect, useState } from "react";
import { productEndpoints } from "../services/apis";
import SingleCard from "../Components/card/singleCard";
import toast from "react-hot-toast";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../reducer/slices/authSlice";


function Home() {

  const dispatch = useDispatch();

  const {user} = useSelector((state)=>state.auth);

  const navigate = useNavigate();


  const [loading , setLoading] = useState(true);

  const [searchProducts , setSearchProducts] = useState(null);

  // it store the maximum price our product have 
  const [maxPrice , setMaxPrice] = useState(null);
  
  // with this we handle the price filter 
  const [price , setPrice] = useState(null);

  // it store the all products 
  const [allProducts, setAllProducts] = useState([]);

  const [allSecureProducts , setAllSecureProducts] = useState([]);

    // this is for cart fetch 
    const [cartItem , setCartItem] = useState([]);

    const [allCart , setAllCart] = useState([]);

  // it will handle the total number of cart 
  const [totalCart , setTotalCart] = useState(0);


  // this handle search product name 
  const [searchProName , setSearchProName] = useState(null);

  // this handler the change handler of search input field 
  const searchChangeHandler = (e)=>{
    setSearchProName(e.target.value);

  }

  // this handle the search product api 
  const searchProduct = async(event)=>{

    event.preventDefault();

    const toastId = toast.loading("Loading...");

    if(searchProName === null || searchProName == ""){
        return toast.error("Please write someThing");
    }
    try{

      const response = await fetch(`https://dummyjson.com/products/search?q=`+`${searchProName}`);

      if(response.status === 200){
        const data = await response.json();
        
         setAllProducts(data?.products);
         setSearchProducts(data?.products);

         toast.success("successfully search");

      }





    } catch(error){
   console.log(error);
    }

    toast.dismiss(toastId);
  }


  // this api is for fetch all products 
  const fetchAllProducts = () => {

    try{
      setLoading(true);

        fetch(`${productEndpoints.FETCH_ALL_PRODUCTS}`)
        .then((res) => res.json())
        .then((res) =>{

           const allProductsDetails = res.products;

         setAllProducts(res?.products);

         const maxPriceProduct = res?.products.reduce((maxProduct, currentProduct) => {
          return currentProduct.price > maxProduct.price ? currentProduct : maxProduct;
        }, allProductsDetails[0]);

        setAllSecureProducts(res?.products);

   setMaxPrice(maxPriceProduct?.price);   
   setPrice(maxPriceProduct?.price);     
   
   setLoading(false);
        });
    } catch(error){
        console.log(error);

    }

   
  };


  // this update the filter vlaue of price 
  const updateFilterValue =  (event)=>{

    let value = event.target.value;

setPrice(value);


  }

  // this update the price product according to this price 

  const updatePriceProduct = ()=>{
    let filteredData;

    if(searchProName === null || searchProName === ""){

       filteredData = allSecureProducts.filter(product => product.price < price);
      
    } 
    else{

       filteredData = searchProducts.filter(product => product.price < price);

    }
    setAllProducts(filteredData);
    
  }


  const fetchCartItems =async()=>{
    try{

        const response = await fetch(productEndpoints.ALL_CART_PRODUCTS + `/${user?.id}`);

        if(response.status === 200){
            const data = await response.json();

            setCartItem(data?.carts[0]);

            setAllCart([...data.carts[0].products])
            setTotalCart(data.carts[0].products.length);

        }
    } catch(error){
        console.log(error);
    }
 }

  useEffect(()=>{
    if(searchProName == null || searchProName == ""){
    setAllProducts([...allSecureProducts]);
    }
},[searchProName])


  useEffect(()=>{
       updatePriceProduct();
  },[price])
  
 useEffect(() => {
  fetchAllProducts();
  fetchCartItems();
}, []);


const logoutHandler = ()=>{
try{
 localStorage.removeItem("token");
 localStorage.removeItem("userDetail");
 dispatch(setToken(null));
 dispatch(setUser(null));
      navigate("/login")
      toast.success("Successfuly Logout");


} catch(error){

}
}

  return (
    <div className="w-full min-h-[100vh] bg-[#111827] flex flex-col items-center gap-5  pt-4">

{/* navbar */}
       <div className="flex  w-full justify-between  px-[40px] border-b-[1px] navbar border-white ">

      <h2 className="text-white font-[600] text-[24px] homePageText">Home Page</h2>

      <div className="flex gap-6  ">

    
       <div  onClick={()=>navigate("/cart" , {state:{cartItem , allCart}}) } className=" px-2 py-2 relative">


      <FaCartShopping className="text-white justify-end text-[22px] cursor-pointer" />
    
    <p className="absolute top-0 right-2 text-red-500 text-[22px] font-[600]  totalCartAnimate">{totalCart}</p>

    

       </div>

       <button onClick={logoutHandler} className="bg-red-400 text-white px-3 py-2 rounded-xl mb-4 hover:bg-red-600 transition-all duration-100">Logout</button>

       </div>
      

       </div>
      
      {/* filter options */}
      {
        loading ?(
         <span></span>
        ):(
 <div className="flex gap-4 w-full px-4 justify-evenly items-center searchFilterWrapper">
   
 <form onSubmit={searchProduct} className="w-[50%] searchProductForm">   
     <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
     <div class="relative">
         <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
             <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
             </svg>
         </div>
         <input type="search" name="searchProName"  value={searchProName} onChange={searchChangeHandler} id="searchProName" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
         <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Search</button>
     </div>
 </form>
 
 {/* price filter options  */}
 
   <div className="filter_price">
 
   <h3 className="text-white font-[600] text-[20px]">Price: <span className="text-white font-[600] text-[18px]">{price}</span></h3>
 
    <input type="range" name="price"  min={0} max={maxPrice} value={price} onChange={updateFilterValue} />
 
 </div>
 
 
 </div>
        )
      }
     

{
  loading ?(
    <span class="loader"></span>
  ):(
    <div className="w-full h-full ">
    {allProducts.length > 0 ? (
      <div className="w-full  h-full justify-center py-3 flex flex-wrap gap-3 ">
        {allProducts.map((product) => (
          <SingleCard setCartItem={setCartItem} setAllCart={setAllCart} setTotalCart={setTotalCart} key={product.id} product={product} />
        ))}
      </div>
    ) : (
      <div className="text-white font-[600] text-center ">
        No Product Found
      </div>
    )}
  </div>

  )
}
   
    </div>
  );
}

export default Home;
