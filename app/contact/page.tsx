"use client"

import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faGithub,
    faDiscord,
    faBilibili
} from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

const contactMethods = [
    {
        name: "GitHub",
        icon: faGithub,
        link: "https://github.com/Serendipity-zyf",
        username: "@Serendipity-zyf"
    },
    {
        name: "Discord",
        icon: faDiscord,
        link: "https://discord.gg/NXjutSxn",
        username: "PixelCookies"
    },
    {
        name: "Bilibili",
        icon: faBilibili,
        link: "https://space.bilibili.com/666446434",
        username: "@PixelCookies"
    },
    {
        name: "Email",
        icon: faEnvelope,
        link: "mailto:metazyf@gmail.com",
        username: "metazyf@gmail.com"
    }
]

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1
                className="text-4xl font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                联系方式
            </motion.h1>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {contactMethods.map((method, index) => (
                    <motion.a
                        key={method.name}
                        href={method.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex items-center gap-4">
                            <FontAwesomeIcon icon={method.icon} className="h-6 w-6" />
                            <div>
                                <h2 className="text-xl font-semibold">{method.name}</h2>
                                <p className="text-muted-foreground">{method.username}</p>
                            </div>
                        </div>
                    </motion.a>
                ))}
            </motion.div>
        </div>
    )
} 