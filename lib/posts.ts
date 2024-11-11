import fs from 'fs'
import path from 'path'

export function getPostCount() {
  try {
    const postsDirectory = path.join(process.cwd(), 'posts');
    if (!fs.existsSync(postsDirectory)) {
      console.warn('Posts directory not found, creating one...');
      fs.mkdirSync(postsDirectory);
      return 0;
    }
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.length;
  } catch (error) {
    console.error('Failed to get post count:', error);
    return 0;
  }
} 