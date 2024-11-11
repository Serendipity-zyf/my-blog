import fs from 'fs'
import path from 'path'

export function getPostCount() {
  const postsDirectory = path.join(process.cwd(), 'posts')  // 假设你的文章在 posts 目录
  try {
    const files = fs.readdirSync(postsDirectory)
    return files.filter(file => file.endsWith('.mdx') || file.endsWith('.md')).length
  } catch (error) {
    console.error('Failed to get post count:', error)
    return 0
  }
} 