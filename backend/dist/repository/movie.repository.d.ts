import "dotenv/config";
export declare const createMovie: (movieId: string) => Promise<{
    id: string;
    movieId: string;
    processingStatus: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const updateMovieStatus: (movieId: string, status: string) => Promise<{
    id: string;
    movieId: string;
    processingStatus: string;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=movie.repository.d.ts.map