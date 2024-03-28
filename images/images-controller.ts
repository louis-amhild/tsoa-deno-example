import { Route, Query, Request, Path, Body, Post, Get, Controller } from "@tsoa-deno/runtime";

import { Buffer } from "https://deno.land/x/node_buffer@1.1.0/src/buffer.js";

import sharp from "npm:sharp@0.33.0";

import { parseMediaType } from "https://deno.land/std@0.221.0/media_types/parse_media_type.ts";

import { dirname } from 'https://deno.land/std@0.214.0/path/mod.ts';
import * as path from "https://deno.land/std@0.214.0/path/mod.ts";

@Route('/images')
export class ImagesController extends Controller {
    @Get('')
    public async rootGet(@Query() url?: string): Promise<Buffer> {
        let image;
        if (url) {
            image = await getRemoteImage(url);
        }
        else {
            image = {
                data: getLocalImage("./rhino.png"),
                mediaType: 'image/png'
            }
        }

        if (typeof (image) === "string") {
            throw new Error("Could not get image");
        }

        this.setHeader('Content-Type', image.mediaType);
        // const result = await resize(image.data, 200, 200, 100, { x1: 0, y1: 0, x2: 800, y2: 800 });
        const result = await resize(image.data, 400, 400, 100);
        // return Buffer.from(image.data.buffer);
        return Buffer.from(result);
    }
}

export function getFullPath(relativePath: string): string {
    // Get script path
    const testPath = dirname(new URL(import.meta.url).pathname);
    // Join test script path and relative file path (replace leading \ for Windows path to work as Deno is adding this for some reason)
    return path.join(testPath, relativePath).replace(/^\\/, '');
}

function getLocalImage(path: string): ArrayBufferLike {
    const file = Deno.readFileSync(getFullPath(path));
    return file.buffer;
}

async function resize(inputImage: ArrayBufferLike, width: number, height: number, quality: number = 100, cropping?: ImageCropping, rotation: number = 0): Promise<ArrayBufferLike> {
    let resize = sharp(inputImage);

    // If cropping parameter is present, first crop image, then resize it
    if (cropping) {
        const region: sharp.Region = {
            left: Math.round(cropping.x1),
            top: Math.round(cropping.y1),
            width: Math.round(cropping.x2 - cropping.x1),
            height: Math.round(cropping.y2 - cropping.y1)
        };
        resize = resize.rotate(rotation).extract(region).resize(width, height);
    }
    else {
        console.log("Sharp Resize...");
        try {
            resize = sharp(inputImage).resize(width, height);
        }
        catch (err) {
            console.log("Got sharp error ", err?.message);
            throw err;
        }
    }

    // By default, the output format of the image is defined by the output path: https://sharp.pixelplumbing.com/api-output
    // For WebP and JPEG images, however, we want to be able to modify the `quality` option
    // const isWebP = /^.*\.(webp)$/i;
    // const isJpeg = /^.*\.(jpg|jpeg)$/i;

    // if(resizePath.match(isWebP)) {
    //     resize = resize.webp({ quality: quality });
    // }
    // else if(resizePath.match(isJpeg)) {
    console.log("Sharp JPEG...");
    resize = resize.jpeg({ quality: quality });
    // }
    // else {
    //     console.warn(`The provided image format does not feature a variable quality setting`);
    // }

    console.log("Resize to buffer...");
    const buffer = await resize.toBuffer();
    return buffer;
}

async function getRemoteImage(image: string): Promise<string | { data: Uint8Array, mediaType: string }> {
    const sourceRes = await fetch(image);
    if (!sourceRes.ok) {
        return "Error retrieving image from URL.";
    }
    const mediaType = parseMediaType(sourceRes.headers.get("Content-Type")!)[0];
    if (mediaType.split("/")[0] !== "image") {
        return `URL is not image type. Media type is '${mediaType}'`;
    }
    return {
        data: new Uint8Array(await sourceRes.arrayBuffer()),
        mediaType,
    };
}

/**
 * Image cropping information 
 */
export interface ImageCropping {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
