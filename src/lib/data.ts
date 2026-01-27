import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function getLocalData() {
    const dataFilePath = path.join(process.cwd(), 'data', 'content.json');
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error("Error reading data file:", error);
        return { products: [], articles: [] };
    }
}
