import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
const resolutions = [
    { width: 1920, height: 1080, bitRate: 2000 }, // 1080p
    { width: 1280, height: 720, bitRate: 1000 }, // 720p
    { width: 854, height: 480, bitRate: 500 }, // 480p
    { width: 640, height: 360, bitRate: 400 }, // 360p
    // {width: 426, height: 240, bitRate: 300}, // 240p
    // {width: 256, height: 144, bitRate: 200}, // 144p
];
/**
* Processes a video file for HTTP Live Streaming (HLS).
*
* @param inputPath - The path to the input video file.
* @param outputPath - The path where the processed HLS files will be saved.
* @param callback - A callback function that is called when the processing is complete.
*                    The callback receives an error object if an error occurred,
*                    and the master playlist string if the processing was successful.
*/
export const processVideoForHls = (inputPath, outputPath, callBack) => {
    fs.mkdirSync(outputPath, { recursive: true }); // Create the output directory
    const masterPlaylist = `${outputPath}/master.m3u8`; // Path to the master file
    const masterContent = [];
    let countProcessing = 0;
    resolutions.forEach((resolution) => {
        const variantOutput = `${outputPath}/${resolution.height}p`;
        const variantPlaylist = `${variantOutput}/playlist.m3u8`; // Path to the variant playlist file
        fs.mkdirSync(variantOutput, { recursive: true }); // Create the variant directory
        ffmpeg(inputPath).outputOptions([
            `-vf scale=w=${resolution.width}:h=${resolution.height}`,
            `-b:v ${resolution.bitRate}k`,
            `-codec:v libx264`,
            `-codec:a aac`,
            `-hls_time 10`,
            `-hls_playlist_type vod`,
            `-hls_segment_filename ${variantOutput}/segment%03d.ts`
        ])
            .output(variantPlaylist)
            .on('end', () => {
            masterContent.push(`EXT-X-STREAM-INF:BANDWIDTH=${resolution.bitRate * 1000},RESOLUTION=${resolution.width}x${resolution.height}\n${resolution.height}p/playlist.m3u8`);
            countProcessing += 1;
            if (countProcessing == resolutions.length) {
                console.log("Processing Complete\nMaster Content:", masterContent);
                fs.writeFileSync(masterPlaylist, `#EXTM3U\n${masterContent.join('\n')}`);
                callBack(null, masterPlaylist); // Call the callBack with the masterPlaylist path if it was success
            }
        })
            .on('error', (error) => {
            console.log("Error While Video Processing For HLS.");
            console.log(error);
            callBack(error); // Call the callBack with an error.
        })
            .run();
    });
};
//# sourceMappingURL=video.service-.js.map