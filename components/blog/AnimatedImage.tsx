'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface AnimatedImageProps {
    src: string
    alt: string
}

export default function AnimatedImage({ src, alt }: AnimatedImageProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const imageSrc = src.startsWith('http') || src.startsWith('/')
        ? src
        : `/posts/images/${src}`

    console.log('Loading image from:', imageSrc)

    return (
        <div className="my-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-lg"
            >
                <Image
                    src={imageSrc}
                    alt={alt}
                    width={800}
                    height={400}
                    className="w-full h-auto object-cover rounded-lg"
                    onLoadingComplete={() => setIsLoading(false)}
                    onError={(e) => {
                        console.error('Image load error:', e)
                        setError('Failed to load image')
                    }}
                    priority={false}
                />
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/10">
                        <div className="loading-spinner" />
                    </div>
                )}
                {error && (
                    <div className="text-red-500 text-center mt-2">
                        {error}
                    </div>
                )}
            </motion.div>
        </div>
    )
}