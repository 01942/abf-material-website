import { promises as fs } from 'fs';
import path from 'path';

export async function getLocalData() {
    // Determine path consistently for both dev and prod
    const jsonPath = path.join(process.cwd(), 'data', 'content.json');
    const fileContents = await fs.readFile(jsonPath, 'utf8');
    return JSON.parse(fileContents);
}
