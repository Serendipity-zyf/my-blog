'use client'

import { useEffect, useRef } from 'react'

interface PostContentProps {
    content: string
}

export function PostContent({ content }: PostContentProps) {
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!contentRef.current) return

        const images = contentRef.current.getElementsByTagName('img')
        Array.from(images).forEach(img => {
            const src = img.getAttribute('src') || ''
            if (!src.startsWith('http') && !src.startsWith('/')) {
                img.setAttribute('src', `/posts/images/${src}`)
            }
        })
    }, [content])

    return (
        <div
            ref={contentRef}
            className="prose prose-zinc dark:prose-invert max-w-none"
        >
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}