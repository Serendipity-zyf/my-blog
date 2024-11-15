'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
}

export function CustomImage({ src, alt, width = 800, height = 400, className }: ImageProps) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
                'transition-opacity duration-300',
                isLoaded ? 'opacity-100' : 'opacity-0',
                className
            )}
            onLoadingComplete={() => setIsLoaded(true)}
        />
    )
} 