import { Route, Body, Post, Get, Controller } from "@tsoa-deno/runtime";

import { dirname } from 'https://deno.land/std@0.214.0/path/mod.ts';
import * as path from "https://deno.land/std/path/mod.ts";

interface EmbeddingRequest {
    input?: string
}

interface EmbeddingResponse {
    embedding: number[]
}

function getFullPath(relativePath: string): string {
    // Get script path
    const testPath = dirname(new URL(import.meta.url).pathname);
    // Join test script path and relative file path (replace leading \ for Windows path to work as Deno is adding this for some reason)
    return path.join(testPath, relativePath).replace(/^\\/, '');
  }

function readFileSync(filePath: string) : string {
    const decoder = new TextDecoder("utf-8");
    const file = Deno.readFileSync(getFullPath(filePath));
    return decoder.decode(file);
}

/**
 * Get info about the CDN cache of StoryHunt domains and refresh cache
 */
@Route('/')
export class RootController extends Controller {
    @Get('')
    public rootGet(): string {
        this.setHeader("Content-Type", "text/html");
        const index = readFileSync("./index.html");
        return index.toString();
    }
}
/**
 * Get info about the CDN cache of StoryHunt domains and refresh cache
 */
@Route('/example')
export class TsoaController extends Controller {
    @Get('')
    public rootGet(): { message: string } {
        return { message: "Hello from TSOA Deno Demo Controller" };
    }

    @Get('test')
    public testGet(): EmbeddingResponse {
        const embedding = [9, 9, 9];
        return { embedding };
    }

    @Post('test')
    public test(@Body() body: EmbeddingRequest): EmbeddingResponse {
        const embedding = [1, 2, 3, 4, 5, 10];
        console.log("Input body ", body);
        return { embedding };
    }

    @Post('test2')
    public test2(): EmbeddingResponse {
        const embedding = [3, 4, 5, 6, 2];
        return { embedding };
    }
}

// To invoke (Supabase):
/** curl -i --location --request POST 'http://localhost:54321/functions/v1/example/test' \
     --header 'Authorization: Bearer xxxxxxxxxxxxxxxxxx' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'
**/
