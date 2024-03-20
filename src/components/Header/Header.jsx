
import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItemsLeft = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
     },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  const navItemsRight = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ]


  return (
    <div className="relative w-full bg-custom-blue text-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between border-black border-b-2 py-2 px-4  sm:px-6 lg:px-8">
            {/* Logo Component */}
            <Link to='/'>
                <div className="inline-flex items-center space-x-2">
                    {/* <span >
                        <img className='w-30 h-20' src="src\components\Header\blogs-high-resolution-logo.png" alt="" />
                    </span> */}

                    <Logo />

                    {/* <span className="font-bold">Blog</span> */}
                </div>
            </Link>

            {/* Left Side Items */}
            <div className="hidden grow items-start lg:flex">
                <ul className="ml-12 inline-flex space-x-8">
                    {navItemsLeft.map((item) => (
                        item.active ? (
                        <li key={item.name}>
                            <button
                                onClick={() => navigate(item.slug)}
                                className="inline-flex items-center text-lg font-semibold text-slate-200 hover:text-sky-500"
                            >
                                {item.name}
                            </button>
                        </li>
                        ) : null
                    ))}
                </ul>
            </div>

            {/* Right Side Items */}
            <div className="hidden space-x-2 lg:block">
                <ul>
                    {navItemsRight.map((item) => (
                        item.active ? (
                        <li className='inline-block' key={item.name}>
                            <button
                                onClick={() => navigate(item.slug)}
                                className="rounded-md ml-4 bg-transparent px-3 py-2 text-lg font-semibold border border-slate-200 text-slate-200 hover:text-green-500 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                {item.name}
                            </button>
                        </li>
                        ) : null
                    ))}
                    {authStatus && (
                        <li>
                            {/* <LogoutBtn className="rounded-md bg-transparent px-3 py-2 text-lg font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" /> */}
                            <LogoutBtn className="px-4 py-2 text-lg text-slate-200 font-bold rounded-xl border border-slate-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" />
                        </li>
                    )}
                </ul>
            </div>

            {/* Mobile View Toggle Button */}
            <div className="lg:hidden">
                <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
            </div>

            {/* Mobile view menu open */}
            {isMenuOpen && (
                <div className="absolute  inset-x-0 top-0 z-50 border-b border-slate-200 origin-top-right bg-custom-blue transform p-2 transition lg:hidden">
                    <div className="divide-y-2 divide-gray-50 rounded-lg  bg-custom-blue shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="px-5 pb-6 pt-5">

                            {/* Mobile view Logo and Cross button */}
                            <div className="flex items-center justify-between">
                                <div className="inline-flex items-center space-x-2">
                                    <span>
                                        <Logo />
                                    </span>
                                    {/* <span className="font-bold">DevUI</span> */}
                                </div>
                                <div className="-mr-2">
                                    <button
                                    type="button"
                                    onClick={toggleMenu}
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                    <span className="sr-only">Close menu</span>
                                    <X className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                            {/* ------------------------------ */}

                            {/* Mobile view NavLeftItems */}
                            <div className="mt-6">
                                <nav className="flex flex-col items-center mb-4 gap-y-4">
                                    {navItemsLeft.map((item) => (
                                        item.active ? (
                                        <a 
                                            key={item.name}
                                            className="-m-3 my-0  flex items-center rounded-md p-3 text-sm font-semibold text-slate-200 hover:text-black hover:bg-gray-50"
                                        >
                                            <button
                                                onClick={() => {navigate(item.slug)
                                                  setIsMenuOpen(false)}}
                                                className="px-12 text-base font-medium "
                                            >
                                                {item.name}
                                            </button>
                                        </a>
                                        ) : null
                                    ))}
                                    
                                </nav>
                            </div>

                            {/* ------------------ */}

                            {/* Mobile view NavRightItems */}
                            <div className="flex flex-col items-center mt-2">
                                <ul>
                                    {navItemsRight.map((item) => (
                                        item.active ? (
                                        <li className='my-3' key={item.name}>
                                            <button
                                                onClick={() => {navigate(item.slug)
                                                setIsMenuOpen(false)}}
                                                className="w-full rounded-md  px-12 py-3 text-base font-semibold text-white shadow-sm border border-slate-200 hover:text-green-500 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                        ) : null
                                    ))}
                                    {authStatus && (
                                        <li onClick={() => {setIsMenuOpen(false)}}>
                                            
                                            <LogoutBtn className="px-24 py-2 text-lg text-slate-200 font-bold rounded-xl border border-slate-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" />
                                        </li>
                                    )}
                                </ul>
                            </div>


                        </div>       
                    </div>       
                </div>       
            )}
        </div>
    </div>

  )
}

export default Header



