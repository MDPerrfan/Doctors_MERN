import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const {token,setToken}=useContext(AppContext);

    const logOut=()=>{
        setToken(false)
        localStorage.clear('token')
    }
    return (
        <>
            <div className='flex items-center justify-between text-sm pt-4 mb-5 border-b-gray-400'>
                <img onClick={() => navigate('/')} className='w-56 cursor-pointer' src={assets.logo} alt="logo" />
                <ul className='hidden md:flex items-start gap-6 '>
                    <NavLink to='/'>
                        <li className='py-1'>Home</li>
                        <hr className='border-none outline-none h-0.5 bg-primary w-3/4 m-auto hidden' />
                    </NavLink>
                    <NavLink to='/doctors'>
                        <li className='py-1'>All Doctors</li>
                        <hr className='border-none outline-none h-0.5 bg-primary w-3/4 m-auto hidden' />
                    </NavLink>
                    <NavLink to='/about'>
                        <li className='py-1'>About</li>
                        <hr className='border-none outline-none h-0.5 bg-primary w-3/4 m-auto hidden' />
                    </NavLink>
                    <NavLink to='/contact'>
                        <li className='py-1'>Contact</li>
                        <hr className='border-none outline-none h-0.5 bg-primary w-3/4 m-auto hidden' />
                    </NavLink>
                </ul>
                <div className='flex items-center gap-4'>
                    {token ? <div className='flex items-center gap-3 cursor-pointer group relative'>
                        <img className='w-8 rounded-full' src={assets.profile_pic} alt="img" />
                        <img className='w-2.5' src={assets.dropdown_icon} alt="img" />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 p-4 rounded flex flex-col gap-4'>
                                <p onClick={() => navigate('/profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                <p onClick={()=>logOut()} className='hover:text-black cursor-pointer'>Logout</p>
                            </div>
                        </div>
                    </div>
                        :
                        <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
                    }
                    <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="menu" />
                    {/*Mobile menu*/}
                    <div className={`${showMenu?"fixed w-full":"h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                        <div className='flex items-center justify-between px-5 py-6'>
                            <img className='w-28' src={assets.logo} alt="logo" />
                            <img className='w-8' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="menu" />
                        </div>
                        <ul  onClick={() => setShowMenu(false)} className='flex flex-col  px-5  gap-6 items-center' >
                            <NavLink to='/'>
                                <li className='py-1'>Home</li>
                                <hr className='border-none outline-none h-0.5 bg-primary w-3/4 m-auto hidden' />
                            </NavLink>
                            <NavLink to='/doctors'>
                                <li className='py-1'>All Doctors</li>
                                <hr className='border-none outline-none h-0.5 bg-primary w-3/4 m-auto hidden' />
                            </NavLink>
                            <NavLink to='/about'>
                                <li className='py-1'>About</li>
                                <hr className='border-none outline-none h-0.5 bg-primary w-3/4 m-auto hidden' />
                            </NavLink>
                            <NavLink to='/contact'>
                                <li className='py-1'>Contact</li>
                                <hr className='border-none outline-none h-0.5 bg-primary w-3/4 m-auto hidden' />
                            </NavLink>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className='border-none outline-none h-0.5 bg-slate-300 ' />
        </>
    )
}

export default Navbar;
