"use client"

import { motion } from "framer-motion"

export default function ProjectsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1
                className="text-4xl font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                项目展示
            </motion.h1>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {/* 这里后续可以添加项目卡片组件 */}
                <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4">敬请期待</h2>
                    <p className="text-muted-foreground">项目内容正在建设中...</p>
                </div>
            </motion.div>
        </div>
    )
} 