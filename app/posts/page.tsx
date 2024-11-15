import ClientPosts from '@/components/blog/ClientPosts'
import { getAllPosts } from '@/lib/posts'

export default async function Posts() {
  try {
    const posts = await getAllPosts()
    return <ClientPosts posts={posts} />
  } catch (error) {
    console.error('Error loading posts:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">文章列表</h1>
        <p className="text-red-500">加载文章列表时出错</p>
      </div>
    )
  }
}