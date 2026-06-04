/**
* Processes a video file for HTTP Live Streaming (HLS).
*
* @param inputPath - The path to the input video file.
* @param outputPath - The path where the processed HLS files will be saved.
* @param callback - A callback function that is called when the processing is complete.
*                    The callback receives an error object if an error occurred,
*                    and the master playlist string if the processing was successful.
*/
export declare const processVideoForHls: (inputPath: string, outputPath: string, callBack: (error: Error | null, masterPlaylist?: string) => void) => void;
//# sourceMappingURL=video.service-.d.ts.map