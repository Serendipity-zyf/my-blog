'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface Post {
    slug: string
    title: string
    date: string
    tags?: string[]
    category?: string
}

export default function ClientPosts({ posts }: { posts: Post[] }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1
                className="text-4xl font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                文章列表
            </motion.h1>

            <motion.div
                className="grid gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {posts.map((post, index) => (
                    <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                    >
                        <Link
                            href={`/posts/${post.slug}`}
                            className="block p-6 rounded-lg border bg-card text-card-foreground hover:shadow-md transition-shadow"
                        >
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                            {post.date && (
                                <time className="text-sm text-muted-foreground">
                                    {new Date(post.date).toLocaleDateString()}
                                </time>
                            )}
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
} 