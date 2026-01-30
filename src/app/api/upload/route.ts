import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

export const runtime = 'nodejs'; // Required for fs

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

        // Check environment
        if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO_OWNER && process.env.GITHUB_REPO_NAME) {
            // Production: Upload to GitHub
            const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
            const owner = process.env.GITHUB_REPO_OWNER;
            const repo = process.env.GITHUB_REPO_NAME;
            const filePath = `public/uploads/${filename}`;

            await octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path: filePath,
                message: `Upload file: ${filename}`,
                content: buffer.toString('base64'),
                committer: {
                    name: 'Report System',
                    email: 'system@yipengchunhui.com'
                }
            });

            // Return the raw URL or a path that works with Next.js public
            // In Next.js, files in public/ are served at root. 
            // However, on Vercel, this won't be immediately available until rebuild unless using Blob.
            // But since we are committing, it triggers a rebuild? No, usually not for public. 
            // Wait, committing to the repo triggers a Vercel deployment! 
            // So it will be available after deployment (1-2 mins). 
            // This is "Good enough" for a low-volume internal tool without external storage.
            return NextResponse.json({ url: `/uploads/${filename}`, message: 'File uploaded. It will be available after the build completes.' });
        } else {
            // Local Development: Write to filesystem
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');
            await fs.mkdir(uploadDir, { recursive: true });

            await fs.writeFile(path.join(uploadDir, filename), buffer);
            return NextResponse.json({ url: `/uploads/${filename}` });
        }

    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
