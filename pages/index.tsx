import userCurrentUser from '@/hooks/useCurrentUser';
import { NextPageContext } from 'next'
import {getSession, signOut} from 'next-auth/react'

//protect home route
export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }

}

  
export default function Home() {
  //fetch our user using our user hook
  //create alias for data
  const {data: user} = userCurrentUser();

  return (
    <>
     <h1 className="text-4xl text-green-500">Netflix Clone</h1>
     {/*show your email when you logged in */}
     <p className='text-white'>Logged in as: {user?.email}</p>
     <button className='h10 w-full bg-white' onClick={() => signOut()}>Logout!</button>
    </>
  )
}
