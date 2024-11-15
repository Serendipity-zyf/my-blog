import { getPost, getAllPosts } from '@/lib/posts'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { PostMeta } from '@/components/blog/PostMeta'
import { PostContent } from '@/components/blog/PostContent'
import Link from 'next/link'

export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
    try {
        const post = await getPost(params.slug)

        return (
            <div className="container mx-auto px-4 max-w-8xl">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8">
                    <article className="prose prose-zinc dark:prose-invert
                        prose-headings:font-bold
                        prose-h1:text-4xl
                        prose-h2:text-3xl
                        prose-h3:text-2xl
                        prose-p:text-justify
                        prose-img:rounded-lg
                        max-w-none">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                            <PostMeta
                                date={post.date}
                                readingTime={post.readingTime}
                                tags={post.tags}
                            />
                        </div>

                        <PostContent content={post.content} />
                    </article>

                    <aside className="hidden lg:block">
                        <div className="sticky top-8 space-y-8">
                            <div className="rounded-lg border p-4">
                                <h2 className="text-lg font-semibold mb-4">目录</h2>
                                <TableOfContents headings={post.toc} />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        )
    } catch (_error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-red-500">文章未找到</h1>
                <p className="mt-4">抱歉，无法找到请求的文章。</p>
                <Link href="/posts" className="text-primary hover:underline mt-4 inline-block">
                    返回文章列表
                </Link>
            </div>
        )
    }
}