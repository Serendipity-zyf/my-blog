import { CalendarIcon, ClockIcon, TagIcon } from 'lucide-react'

interface PostMetaProps {
    date: string
    readingTime?: number
    tags?: string[]
}

interface PostMetaProps {
    date: string
    readingTime?: number
    tags?: string[]
}

export function PostMeta({ date, readingTime, tags }: PostMetaProps) {
    return (
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
                <time dateTime={date}>
                    {new Date(date).toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </time>
            </div>
            {readingTime && (
                <div className="flex items-center gap-1">
                    <span>{readingTime} 分钟阅读</span>
                </div>
            )}
            {tags && tags.length > 0 && (
                <div className="flex items-center gap-2">
                    <div className="flex gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
} 