'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TableOfContentsProps {
    headings: Array<{
        id: string
        text: string
        level: number
    }>
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('')

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '-100px 0% -80% 0%' }
        )

        headings.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [headings])

    return (
        <nav className="space-y-1">
            {headings.map(({ id, text, level }) => (
                <a
                    key={id}
                    href={`#${id}`}
                    className={cn(
                        'block text-sm transition-colors hover:text-foreground',
                        level === 2 ? 'pl-0' : `pl-${(level - 2) * 4}`,
                        activeId === id
                            ? 'text-foreground font-medium'
                            : 'text-muted-foreground'
                    )}
                    onClick={(e) => {
                        e.preventDefault()
                        document.getElementById(id)?.scrollIntoView({
                            behavior: 'smooth'
                        })
                    }}
                >
                    {text}
                </a>
            ))}
        </nav>
    )
} 