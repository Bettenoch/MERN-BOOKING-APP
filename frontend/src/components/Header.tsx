import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="bg-blue-800 py-6">
        <div className="container mx-auto flex justify-between">
            <span className="text-3xl text-white font-bold tracking-light">
                <Link to='/'>BETT'SBOOKINGS.COM</Link>
            </span>
            <span className='flex space-x-2'>
                <Link to='/' className='flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-green'>Sign In</Link>

            </span>
        </div>
    </div>
  )
}

export default Header