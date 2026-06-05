import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();
export const createMovie = async (movieId) => {
    const response = await prisma.movie.create({
        data: {
            movieId,
            processingStatus: "PENDING",
        }
    });
    return response;
};
export const updateMovieStatus = async (movieId, status) => {
    const response = await prisma.movie.update({
        where: {
            movieId
        },
        data: {
            processingStatus: status
        }
    });
    return response;
};
//# sourceMappingURL=movie.repository.js.map