import { useCallback, useState } from "react";
import Input from "@/components/Input"

const Auth = () => {
    // variable with state value = '' , email with value = '' , setEmail update the value of email
    const[email,setEmail] = useState('');
    const[name,setName] = useState('');
    const[password,setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback (() =>{
        // if currentVariant === login toggle to register if not leave it as login
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
        // [] below means add dependence
    },[])

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
                        <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {/* Change the text on button */}
                            {variant === 'login' ? 'Login' : 'Sign up'}
                        </button>
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