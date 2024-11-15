'use client'

import { motion } from "framer-motion"

export default function ClientAbout() {
    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1
                className="text-4xl font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                关于我
            </motion.h1>

            <motion.div
                className="prose dark:prose-invert max-w-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg leading-relaxed"
                >
                    你好！我是一名热爱技术的开发者。这个博客用于分享我的技术见解和学习心得。
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6"
                >
                    <h2 className="text-2xl font-semibold mb-4">技术栈</h2>
                    <p className="text-lg leading-relaxed">
                        我主要使用 React、Next.js 和 TypeScript 进行开发，同时也热衷于探索新的技术和工具。
                    </p>
                </motion.div>
            </motion.div>
        </div>
    )
} 