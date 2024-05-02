import { Link } from "react-router-dom";

function LoginButton() {
  return (
    <Link to="/loginPage" target="_blank" className= "inline-block absolute end-20 bg-blue-500 hover:bg-blue-700 text-white align-middle vertic font-bold rounded py-2 px-4">
      Login
    </Link>

  )
}

export default LoginButton;