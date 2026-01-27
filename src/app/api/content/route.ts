import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

const dataFilePath = path.join(process.cwd(), 'data', 'content.json');

export async function GET() {
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const data = JSON.parse(fileContents);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const jsonContent = JSON.stringify(body, null, 2);

        // Check if we are in a GitHub-connected environment (Vercel)
        if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO_OWNER && process.env.GITHUB_REPO_NAME) {
            console.log("Using GitHub API for storage...");
            const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
            const owner = process.env.GITHUB_REPO_OWNER;
            const repo = process.env.GITHUB_REPO_NAME;
            const path = 'data/content.json';

            // 1. Get current file SHA (required for update)
            const { data: currentFile } = await octokit.repos.getContent({
                owner,
                repo,
                path,
            });

            if (!Array.isArray(currentFile) && currentFile.sha) {
                // 2. Commit update
                await octokit.repos.createOrUpdateFileContents({
                    owner,
                    repo,
                    path,
                    message: `Content Update via Admin: ${new Date().toISOString()}`,
                    content: Buffer.from(jsonContent).toString('base64'),
                    sha: currentFile.sha,
                    committer: {
                        name: 'Admin Dashboard',
                        email: 'admin@yipengchunhui.com'
                    }
                });
                return NextResponse.json({ success: true, message: 'Saved to GitHub (Redeploying...)' });
            }
        }

        // Fallback: Local filesystem (for local dev)
        console.log("Using Local Filesystem for storage...");
        await fs.writeFile(dataFilePath, jsonContent, 'utf8');
        return NextResponse.json({ success: true, message: 'Data updated locally' });

    } catch (error) {
        console.error("Save Error:", error);
        return NextResponse.json({ error: `Failed to save: ${(error as Error).message}` }, { status: 500 });
    }
}
