const Auth = () => {
    return (
        // add image to background
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            
            {/* //make opaque effect */}
            <div className="bg-black w-full h-full lg:bg-opacity-50">

                <nav className="px-12 py-5">
                    {/* Add Logo */}
                    <img src="/images/logo.png" alt="Logo" className="h-12" />
                </nav>

            </div>
        </div>
    )
}

export default Auth;