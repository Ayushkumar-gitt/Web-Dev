import ImageKit from '@imagekit/nodejs';
import { config } from '../config/config.js';
import fs from 'fs';
import { toFile } from '@imagekit/nodejs';


const client = new ImageKit({
    privateKey: config.IMAKEKIT_SECRET_KEY,
});

export async function uploadFile(buffer, fileName, folder = "snitch") {

    const result = await client.files.upload({
        file: await ImageKit.toFile(buffer),
        fileName: fileName,
        folder: folder
    });

    return result

} 