import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        //check if you are logged in
        await serverAuth(req, res);

        //count how many movies
        const movieCount = await prismadb.movie.count();

        //generate random movie
        const randomIndex = Math.floor(Math.random()*movieCount);

        const randomMovies = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        });

        //we want just 1 movie so randomMovies[0]
        return res.status(200).json(randomMovies[0]);
    } catch (error){
        console.log(error);
        return res.status(400).end();
    }
}