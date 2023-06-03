import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    //limit this handler to a post call
    //if req.method is not equal 'POST' ... -> only allow post calls to /api/register route
    if (req.method !== 'POST'){
        return res.status(405).end();
    }

    try{
        //extract values that we will need
        const {email, name, password} = req.body;

        //check if email has been taken
        const existingUser = await prismadb.user.findUnique({
            where: {
                email: email,
            }
        });

        if (existingUser) {
            return res.status(422).json({error: 'Email taken'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        //save hashedPassword into a new user model
        const user = await prismadb.user.create({
            data:{
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        });

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}