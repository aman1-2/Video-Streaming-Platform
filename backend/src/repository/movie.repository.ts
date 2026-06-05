import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const createMovie = async (movieId: string) => {
    const response = await prisma.movie.create({
        data: {
            movieId,
            processingStatus: "PENDING",

        }
    });

    return response;
}

export const updateMovieStatus = async (movieId: string, status: string) => {
    const response = await prisma.movie.update({
        where: {
            movieId
        },
        data: {
            processingStatus: status
        }
    });

    return response;
}