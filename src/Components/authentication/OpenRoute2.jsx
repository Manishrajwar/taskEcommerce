import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"


function OpenRoute2({children}){
    
  const { token } = useSelector((state) => state.auth)

  if (token === null) {
    return children
  } else {
    return <Navigate to={"/"} />
  }
    
}

export default OpenRoute2;