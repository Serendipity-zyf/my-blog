"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { useTheme } from "@/hooks/useTheme"
import { useLanguage } from "@/hooks/useLanguage"
// import { Menu, Sun, Moon, Globe, Home, FolderGit2, FileText, Mail, User } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faRocket,
  faDesktop,
  faEnvelope,
  faUser,
  faSun,
  faMoon,
  faGlobe,
  faRss,
  faChevronLeft,
  faClock,
  faCloud,
  faCode,  // 添加这个导入
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faReact,
  faPython,
  faDocker,
  faDiscord,
  faBilibili,
  faUnity,
  faNode,
} from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import CardStack from '@/components/ui/CardStack'
import { motion } from "framer-motion"
// 添加 Popover 相关导入
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"  // 改为大写P的Popover
import StatBar from '@/components/ui/StatBar'  // 添加这行导入

interface SidebarProps {
  className?: string;
}

// 添加统计数类型
interface StatItem {
  label: string;
  value: number;
  max: number;
  color: string;
}

interface Stats {
  posts: number;
  views: number;
}

const navigation = {
  zh: {
    home: { name: '首页', icon: faHome },
    projects: { name: '项目', icon: faRocket },
    posts: { name: '文章', icon: faDesktop },
    contact: { name: '联系', icon: faEnvelope },
    about: { name: '关于', icon: faUser }
  },
  en: {
    home: { name: 'Home', icon: faHome },
    projects: { name: 'Projects', icon: faRocket },
    posts: { name: 'Posts', icon: faDesktop },
    contact: { name: 'Contact', icon: faEnvelope },
    about: { name: 'About', icon: faUser }
  }
}

// 1. 将 techStacks 的声明移到文件前面
const techStacks = [
  {
    id: 1,
    tech1: {
      icon: faPython,
      name: "Python",
      desc: "AI & Deep Learning"
    },
    tech2: {
      icon: faDocker,
      name: "Docker",
      desc: "DevOps & Deploy"
    }
  },
  {
    id: 2,
    tech1: {
      icon: faReact,
      name: "React/Next.js",
      desc: "Web Development"
    },
    tech2: {
      icon: faNode,
      name: "Node.js",
      desc: "Backend Services"
    }
  },
  {
    id: 3,
    tech1: {
      icon: faCode,  // 使用 faCode 替代 faCsharp
      name: "C#",
      desc: "Unity Scripts"
    },
    tech2: {
      icon: faUnity,
      name: "Unity",
      desc: "Games Development"
    }
  },
];

export function Sidebar({ className }: SidebarProps) {
  const [expanded, setExpanded] = useState(true)
  const [currentStatus, setCurrentStatus] = useState<number>(0)
  const { theme, setTheme } = useTheme()
  const { lang, setLang } = useLanguage()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentTechStacks, setCurrentTechStacks] = useState(techStacks)
  const [stats, setStats] = useState<Stats>({ posts: 0, views: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        if (!response.ok) throw new Error('Failed to fetch stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchStats()
    // 可以设置定期刷新
    const interval = setInterval(fetchStats, 60000) // 每分钟更新一次
    return () => clearInterval(interval)
  }, [])

  const statsData: StatItem[] = [
    {
      label: "访问量",
      value: stats.views,
      max: Math.max(2000, stats.views),
      color: "from-blue-500 to-cyan-500"
    },
    {
      label: "文章数",
      value: stats.posts,
      max: Math.max(100, stats.posts),
      color: "from-purple-500 to-pink-500"
    }
  ]

  const socialLinks = [
    { icon: faGithub, href: 'https://github.com/Serendipity-zyf', label: 'GitHub' },
    { icon: faDiscord, href: 'https://discord.gg/NXjutSxn', label: 'Discord' },
    { icon: faBilibili, href: 'https://space.bilibili.com/666446434', label: 'Bilibili' },
    { icon: faRss, href: '/rss.xml', label: 'RSS Feed' },
  ]

  const workStatuses = [
    { id: 1, name: "休息", color: "bg-green-500", text: "休息中..." },
    { id: 2, name: "开发", color: "bg-yellow-500", text: "正在开发个人博客..." },
    { id: 3, name: "休假", color: "bg-red-500", text: "休假中..." },
    { id: 4, name: "摸鱼", color: "bg-blue-500", text: "摸鱼中..." },
  ]

  const toggleStatus = () => {
    setCurrentStatus((prev) => (prev + 1) % workStatuses.length)
  }

  // 格式化时间的函数
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  // 处理客户端渲染
  useEffect(() => {
    setMounted(true)
  }, [])

  // 时间更新效果
  useEffect(() => {
    if (!mounted) return

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [mounted])

  // 时间显示组件
  const TimeDisplay = () => {
    if (!mounted) return null

    return (
      <span className="text-sm font-medium">
        {formatTime(currentTime)}
      </span>
    )
  }

  // Add handler for card clicks
  const handleCardClick = () => {
    setCurrentTechStacks(prev => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  return (
    <div className={cn(
      "relative border-r transition-all duration-300 flex flex-col",
      expanded ? "w-64" : "w-16",
      "min-w-[4rem]",
      className
    )}>
      <div className="flex items-center p-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-7 w-7",
            "rounded-md",
            "border shadow-sm",
            "bg-background",
            "hover:bg-accent hover:text-accent-foreground",
            "transition-all duration-200"
          )}
          onClick={() => setExpanded(!expanded)}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={cn(
              "h-4 w-4",
              "transition-transform duration-200",
              expanded ? "" : "rotate-180"
            )}
          />
        </Button>
      </div>

      <div className="flex-1 space-y-4">
        <div className="px-3 py-2">
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/img/my-logo.svg"
              alt="PixelCookies Logo"
              width={expanded ? 100 : 32}
              height={expanded ? 100 : 32}
              className="rounded-full"
            />
          </div>
          {expanded && (
            <h2 className="mb-2 px-4 text-2xl font-title">PixelCookies</h2>
          )}
          <nav className="space-y-1">
            {Object.entries(navigation[lang as keyof typeof navigation]).map(([key, value]) => {
              const href = `/${key === 'home' ? '' : key}`
              const isActive = pathname === href

              return (
                <Link
                  key={key}
                  href={href}
                  className={cn(
                    "flex items-center rounded-lg px-4 py-2 text-base font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground",
                    !expanded && "justify-center px-2"
                  )}
                >
                  <FontAwesomeIcon
                    icon={value.icon}
                    className={cn("h-5 w-5", expanded && "mr-3")}
                  />
                  {expanded && <span className="leading-none">{value.name}</span>}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="px-3 py-2">
          <CardStack
            items={currentTechStacks}
            offset={8}
            scaleFactor={0.04}
            expanded={expanded}
            onCardClick={handleCardClick}
          />

          <motion.div
            className={cn(
              "mt-4 mx-0",
              "bg-background/50 backdrop-blur-sm",
              "transition-all duration-300",
              "cursor-pointer",
              expanded
                ? "p-4 rounded-xl border"
                : "w-10 h-10 rounded-lg border mx-auto flex items-center justify-center"
            )}
            onClick={toggleStatus}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {expanded ? (
              <>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    workStatuses[currentStatus].color
                  )} />
                  <span className="text-sm text-muted-foreground">
                    Status: {workStatuses[currentStatus].name}
                  </span>
                </div>
                <p className="mt-2 text-sm">{workStatuses[currentStatus].text}</p>
              </>
            ) : (
              <div
                className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  workStatuses[currentStatus].color
                )}
              />
            )}
          </motion.div>

          {/* 时间卡片 */}
          {expanded ? (
            <motion.div
              className={cn(
                "mt-4 mx-0",
                "bg-background/50 backdrop-blur-sm",
                "transition-all duration-300",
                "p-4 rounded-xl border"
              )}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} className="h-4 w-4 text-primary" />
                  <TimeDisplay />
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCloud} className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">23°C</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <motion.div
                  className={cn(
                    "mt-4 mx-0",
                    "bg-background/50 backdrop-blur-sm",
                    "transition-all duration-300",
                    "cursor-pointer",
                    "w-10 h-10 rounded-lg border mx-auto flex items-center justify-center"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FontAwesomeIcon icon={faClock} className="h-5 w-5 text-primary" />
                </motion.div>
              </PopoverTrigger>

              <PopoverContent
                className="w-auto p-4 bg-background/50 backdrop-blur-sm border rounded-xl"
                align="start"
                side="right"
                sideOffset={5}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faClock} className="h-4 w-4 text-primary" />
                    <TimeDisplay />
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCloud} className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">23°C</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      <div className="px-3 py-2">
        {expanded && (
          <div className="mb-4 px-4 space-y-3">
            {statsData.map((stat, index) => (
              <StatBar
                key={index}
                label={stat.label}
                value={stat.value}
                max={stat.max}
                color={stat.color}
              />
            ))}
          </div>
        )}

        <div className={cn(
          "flex gap-3",
          expanded ? "flex-row" : "flex-col",
          "justify-center items-center"
        )}>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent hover:text-accent-foreground w-6 h-6"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <FontAwesomeIcon
              icon={theme === 'light' ? faSun : faMoon}
              className="h-5 w-5"
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent hover:text-accent-foreground w-6 h-6"
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          >
            <FontAwesomeIcon icon={faGlobe} className="h-5 w-5" />
          </Button>
        </div>

        <div className={cn(
          "mt-4 flex gap-3",
          expanded ? "flex-row" : "flex-col",
          "justify-center items-center"
        )}>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors w-6 h-6 flex items-center justify-center"
              title={link.label}
            >
              <FontAwesomeIcon icon={link.icon} className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
