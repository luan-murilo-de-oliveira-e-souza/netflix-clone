import axios from 'axios';
import { useCallback, useState } from "react";
import Input from "@/components/input"
//SignIn to use on Login
import {signIn} from 'next-auth/react';
import { useRouter } from 'next/router';

//to add icons google and github
import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa';

const Auth = () => {
    const router = useRouter();
    
    // variable with state value = '' , email with value = '' , setEmail update the value of email
    const[email,setEmail] = useState('');
    const[name,setName] = useState('');
    const[password,setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback (() =>{
        // if currentVariant === login toggle to register if not leave it as login
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
        // [] below means add dependence
    },[]);

    //Create authentication
    //create login action
    const login = useCallback(async() =>{
        try{
            await signIn('credentials',{
                //give values to credentials
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            });

            router.push('/');
        } catch (error){
            console.log(error);
        }
    },[email,password,router])

    //Create register
    const register = useCallback(async() => {
        try{
            await axios.post('/api/register',{
                email,
                name,
                password
            });

            login();
        } catch (error) {
            console.log(error);
        }
        //fill email, name, password because we need to be sync
    },[email, name, password,login]);



    return (
        // add image to background
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            
            {/* //make opaque effect */}
            <div className="bg-black w-full h-full lg:bg-opacity-50">

                <nav className="px-12 py-5">
                    {/* Add Logo */}
                    <img src="/images/logo.png" alt="Logo" className="h-12" />
                </nav>
                {/* Create container */}
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {/* On the top -> If variant === login show Sign in if not show Register */}
                            {variant === 'login' ? 'Sign in' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {/* If variant === register show the input Username */}
                            {variant === 'register' && (
                                <Input 
                                    label="Username"
                                    onChange={(ev : any) => setName(ev.target.value)}
                                    id="name"
                                    value={name}
                                />
                            )}
                            <Input 
                                label="Email"
                                onChange={(ev : any) => setEmail(ev.target.value)}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input 
                                label="Password"
                                onChange={(ev : any) => setPassword(ev.target.value)}
                                id="password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button onClick={variant === 'login' ? login: register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {/* Change the text on button */}
                            {variant === 'login' ? 'Login' : 'Sign up'}
                        </button>
                        <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
                            {/* style of button Google and Github */}
                            <div
                                className='
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition
                                '                                
                            >
                                <FcGoogle size={30} />
                            </div>
                            <div
                                className='
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition
                                '                                
                            >
                                <FaGithub size={30} />
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === 'login' ? 'Create an account' : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Auth;