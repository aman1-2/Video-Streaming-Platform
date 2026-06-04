import { type Request, type Response } from "express";
import fs from 'fs';

import { processVideoForHls } from "../service/video.service-.js";

export const uploadVideoController = async (req: Request, res: Response) => {
    if(!req.file) {
        res.status(400).json({
            success: false,
            message: "No file Uploaded"
        });
        return;
    }

    const videoPath = req.file.path;
    const outputPath = `output/${Date.now()}`;

    processVideoForHls(videoPath, outputPath, (err, masterPlaylistPath) => {
        if(err) {
            res.status(500).json({
                success: false,
                message: "An error occurred while processing the video"
            });
            return;
        }

        // Deleting the video after processing.
        fs.unlink(videoPath, (err) => {
            if(err) {
                console.log("An error occured while deleting the video.", err);
            }
        });

        res.status(200).json({
            success: true,
            message: "Video Proccess Successfully",
            data: `/${masterPlaylistPath}`
        });
        
    });

    // res.status(200).json({
    //     success: true,
    //     message: "File Uploaded Successfully",
    //     videoPath
    // });
}