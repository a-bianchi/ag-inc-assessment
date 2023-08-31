import { logger } from '../logger';
import path from 'path';
import fs from 'fs';
import { FolderType } from './types';

export class Folder {
  private folderPath: string;

  constructor() {
    this.folderPath = path.join(__dirname, '..', '..', 'documents');
  }

  public async getPhotosAndInfotxt(): Promise<FolderType[]> {
    try {
      let response = [];
      const items = fs.readdirSync(this.folderPath);

      for (const item of items) {
        const processedFiles = await this.processFiles(item);
        response = [...processedFiles, ...response];
      }

      return response as FolderType[];
    } catch (error) {
      logger.error(error.message);
    }
  }

  private async processFiles(folder: string): Promise<FolderType[]> {
    const folderPath = path.join(this.folderPath, folder);
    let response: FolderType[] = [];

    return new Promise<FolderType[]>((resolve, reject) => {
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          console.error('Error reading folder:', err);
          reject(err);
          return;
        }

        const fileJPG = files.filter((file) => file.endsWith('.jpg'));
        const fileTXT = files.filter((file) => file.endsWith('.txt'));
        const fileJPGPath = fileJPG.map((file) => path.join(folderPath, file));

        const filePath = path.join(folderPath, fileTXT[0]);
        const content = fs.readFileSync(filePath, 'utf-8');

        response = [{ imagePaths: fileJPGPath, info: JSON.parse(content) }, ...response];

        resolve(response);
      });
    });
  }
}
