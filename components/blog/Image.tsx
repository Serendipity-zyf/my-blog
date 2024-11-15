'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string
    alt: string
}

export function Image({ src, alt, className, ...props }: ImageProps) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <img
            src={src}
            alt={alt}
            className={cn(
                'transition-opacity duration-300',
                isLoaded ? 'opacity-100' : 'opacity-0',
                className
            )}
            onLoad={() => setIsLoaded(true)}
            {...props}
        />
    )
} 