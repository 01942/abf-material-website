import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

const dataFilePath = path.join(process.cwd(), 'data', 'reports.json');

// Ensure data file exists locally
async function ensureDataFile() {
    try {
        await fs.access(dataFilePath);
    } catch {
        const initialData: any[] = [];
        await fs.writeFile(dataFilePath, JSON.stringify(initialData, null, 2));
    }
}

export async function GET() {
    try {
        // For simplicity, we read from local file in dev, or try to read from repo in prod via Octokit if file not found locally?
        // Actually, in Vercel, local file might not persist. We should read from GitHub if env vars are present.

        let data = [];

        if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO_OWNER && process.env.GITHUB_REPO_NAME) {
            const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
            try {
                const { data: fileContent } = await octokit.repos.getContent({
                    owner: process.env.GITHUB_REPO_OWNER,
                    repo: process.env.GITHUB_REPO_NAME,
                    path: 'data/reports.json',
                });

                const fileData = fileContent as any;

                if (!Array.isArray(fileData) && fileData.content) {
                    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
                    data = JSON.parse(content);
                }
            } catch (e: any) {
                if (e.status !== 404) console.error("GitHub Read Error:", e);
                // If 404, return empty array
            }
        } else {
            await ensureDataFile();
            const fileContents = await fs.readFile(dataFilePath, 'utf8');
            data = JSON.parse(fileContents);
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Read Error:", error);
        return NextResponse.json([], { status: 200 }); // Return empty if failed
    }
}

export async function POST(request: Request) {
    try {
        const newReport = await request.json(); // { id, title, submitter, fileUrl, status, date }

        // 1. Get current data
        let currentData = [];
        let sha: string | undefined;

        if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO_OWNER && process.env.GITHUB_REPO_NAME) {
            const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
            const owner = process.env.GITHUB_REPO_OWNER;
            const repo = process.env.GITHUB_REPO_NAME;
            const path = 'data/reports.json';

            try {
                const { data: fileContent } = await octokit.repos.getContent({ owner, repo, path });
                // Cast to any to avoid complex union type checks
                const fileData = fileContent as any;

                if (!Array.isArray(fileData) && fileData.content) {
                    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
                    currentData = JSON.parse(content);
                    sha = fileData.sha;
                }
            } catch (e: any) {
                // File might not exist yet
            }

            // Append new report
            // If it's an update (e.g. status change), we replace the item
            const index = currentData.findIndex((r: any) => r.id === newReport.id);
            if (index >= 0) {
                currentData[index] = newReport;
            } else {
                currentData.push(newReport);
            }

            // Commit
            await octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path,
                message: `Update Reports: ${newReport.title || newReport.id}`,
                content: Buffer.from(JSON.stringify(currentData, null, 2)).toString('base64'),
                committer: { name: 'Report System', email: 'system@yipengchunhui.com' },
                sha
            });

        } else {
            await ensureDataFile();
            const fileContents = await fs.readFile(dataFilePath, 'utf8');
            currentData = JSON.parse(fileContents);

            const index = currentData.findIndex((r: any) => r.id === newReport.id);
            if (index >= 0) {
                currentData[index] = newReport;
            } else {
                currentData.push(newReport);
            }

            await fs.writeFile(dataFilePath, JSON.stringify(currentData, null, 2));
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Save Error:", error);
        return NextResponse.json({ error: "Failed to save report" }, { status: 500 });
    }
}
