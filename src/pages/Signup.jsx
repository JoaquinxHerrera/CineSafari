import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error, setError] = useState('')
    const {signUp} = UserAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password.length < 8) {
            setError('Password should be at least 8 characters long.');
            return;
        }

        try{
            await signUp(email, password)
            navigate('/')
        }catch(error){
            console.log(error)
        }
    }
  return (
    <>
        <div className='w-full h-screen'>
            <img className='hidden sm:block absolute w-full h-full objetct-cover'src="https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/5eea0e13-ba23-4c64-aa47-cda69315c9ef/AR-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
            <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
            <div className='fixed w-full px-4 py-24 z-50'>
                <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
                    <div className='max-w-[320px] mx-auto py-16'>
                            <h1 className='text-3xl font-bold'>Sign up</h1>
                            <form  
                                onSubmit={handleSubmit} 
                                className='w-full flex flex-col py-4'
                            >
                                <input 
                                    onChange={(e)=>{setEmail(e.target.value)}} 
                                    className='p-3 my-2 bg-gray-700 rounded' 
                                    type="email" 
                                    placeholder='Email' 
                                    autoComplete='email'
                                    required
                                />
                                <input 
                                    onChange={(e)=>{setPassword(e.target.value)}} 
                                    className='p-3 my-2 bg-gray-700 rounded' 
                                    type="password" 
                                    placeholder='Password' 
                                    autoComplete='current-password'
                                    required 
                                />
                                 {error && <p className='text-red-500'>{error}</p>}
                                <button className='button-gradient py-3 my-6 rounded font-bold'>Sign Up</button>
                                <div className='flex justify-between items-center text-gray-600'>
                                    <p><input className='mr-2' type="checkbox" />Remember me</p>
                                    <p>Need Help?</p>
                                </div>
                                <p className='py-8'>
                                    <span className='text-gray-600'>
                                        Already subscribed to CineSafari?
                                    </span> {' '}
                                    <Link to='/login'>Sign In</Link>
                                </p>
                            </form>
                            {error && (
                                <div className="error-message">
                                    <p>{error}</p>
                                </div>
                            )}
                    </div>
                </div>
            </div>

        </div>
    </>
  )
}

export default Signup