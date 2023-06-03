import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {compare} from 'bcrypt';

//to access netflix through gmail and github
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google'

import { PrismaAdapter } from '@next-auth/prisma-adapter';

//I can use import prismadb from '../lib/prismadb' as well
import prismadb from '@/lib/prismadb'

export default NextAuth ({
    providers: [
        //to access netflix through gmail and github
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        Credentials ({
            // Id is important to define how we are going to call to access the Sign in
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials){
                //if credentials from email or password missing throw the error
                if (!credentials?.email || !credentials?.password){
                    throw new Error('Email and password required');
                }

                const user =await prismadb.user.findUnique({
                    where: {
                        email:credentials.email
                    }
                })

                //check if the user exists
                if (!user || !user.hashedPassword){
                    throw new Error('Email does not exist');
                }

                //check that the password entered by the user is correct
                const isCorrectPassword = await compare(
                    credentials.password, 
                    user.hashedPassword
                );

                //if the password is incorrect
                if (!isCorrectPassword) {
                    throw new Error ('Incorrect password');
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/auth'
    },
    //it will show any errors and any log into the terminal
    debug: process.env.NODE_ENV === 'development',
    adapter:PrismaAdapter(prismadb),
    session : {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET
})