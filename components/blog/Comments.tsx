'use client'

import Giscus from '@giscus/react'

export function Comments() {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">评论</h2>
            <Giscus
                repo="Serendipity-zyf/my-blog"
                repoId="R_kgDONGiq9w"
                category="Announcements"
                categoryId="DIC_kwDONGiq984CkUQP"
                mapping="pathname"
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="preferred_color_scheme"
                lang="zh-CN"
                loading="lazy"
            />
        </div>
    )
}