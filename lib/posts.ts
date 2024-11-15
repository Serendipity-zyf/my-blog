import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import rehypePrismPlus from 'rehype-prism-plus'
import { getReadingTime, extractTableOfContents } from './blog-helpers'
import { rehypeImgPath } from './rehype-img-path'

const postsDirectory = path.join(process.cwd(), 'posts')

interface Post {
  slug: string
  title: string
  date: string
  content: string
  readingTime: number
  toc: Array<{ id: string; text: string; level: number }>
  tags?: string[]
  category?: string
}

export async function getPost(slug: string): Promise<Post> {
  try {
    // 解码 URL 编码的 slug
    const decodedSlug = decodeURIComponent(slug)
    
    // 获取文件夹中的所有文件
    const files = fs.readdirSync(postsDirectory)
    
    // 查找匹配的文件（不区分编码）
    const fileName = files.find(file => 
      file.replace(/\.md$/, '') === decodedSlug ||
      encodeURIComponent(file.replace(/\.md$/, '')) === slug
    )

    if (!fileName) {
      throw new Error(`Post not found: ${decodedSlug}`)
    }

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    const { data, content } = matter(fileContents)
    
    // 使用原始文件名（去掉.md）作为标题，如果 frontmatter 中没有指定标题
    const title = data.title || fileName.replace(/\.md$/, '')
    
    const toc = extractTableOfContents(content)
    const readingTime = getReadingTime(content)
    
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypePrismPlus)
      .use(rehypeImgPath)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content)
      
    const contentHtml = processedContent.toString()
    
    return {
      slug: decodedSlug, // 使用解码后的 slug
      title, // 使用原始标题
      date: data.date || new Date().toISOString(),
      content: contentHtml,
      readingTime,
      toc,
      tags: data.tags || [],
      category: data.category
    }
  } catch (error) {
    console.error('Error in getPost:', error)
    throw error
  }
}

export async function getAllPosts() {
  try {
    // 确保目录存在
    if (!fs.existsSync(postsDirectory)) {
      console.warn('Posts directory does not exist:', postsDirectory)
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)
        
        return {
          slug,
          title: data.title || slug,
          date: data.date || new Date().toISOString(),
          tags: data.tags || [],
          category: data.category
        }
      })
      .sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime())
  } catch (error) {
    console.error('Error in getAllPosts:', error)
    return []
  }
}


export function getPostCount() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn('Posts directory not found, creating one...')
      fs.mkdirSync(postsDirectory)
      return 0
    }
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.length
  } catch (error) {
    console.error('Failed to get post count:', error)
    return 0
  }
} 
