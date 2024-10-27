"use client"

import { useState } from 'react'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { useTheme } from "@/hooks/useTheme"
import { useLanguage } from "@/hooks/useLanguage"
// import { Menu, Sun, Moon, Globe, Home, FolderGit2, FileText, Mail, User } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faHome, 
  faFolderOpen, 
  faNewspaper, 
  faEnvelope, 
  faUser,
  faSun,
  faMoon,
  faGlobe,
  faBars,
  faRss
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faDiscord,
  faBilibili
} from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  className?: string;
}

const navigation = {
  zh: {
    home: { name: '首页', icon: faHome },
    projects: { name: '项目', icon: faFolderOpen },
    posts: { name: '文章', icon: faNewspaper },
    contact: { name: '联系', icon: faEnvelope },
    about: { name: '关于', icon: faUser }
  },
  en: {
    home: { name: 'Home', icon: faHome },
    projects: { name: 'Projects', icon: faFolderOpen },
    posts: { name: 'Posts', icon: faNewspaper },
    contact: { name: 'Contact', icon: faEnvelope },
    about: { name: 'About', icon: faUser }
  }
}

export function Sidebar({ className }: SidebarProps) {
  const [expanded, setExpanded] = useState(true)
  const { theme, setTheme } = useTheme()
  const { lang, setLang } = useLanguage()
  const pathname = usePathname()

  const socialLinks = [
    { icon: faGithub, href: 'https://github.com/Serendipity-zyf', label: 'GitHub' },
    { icon: faDiscord, href: 'https://discord.gg/NXjutSxn', label: 'Discord' },
    { icon: faBilibili, href: 'https://space.bilibili.com/666446434', label: 'Bilibili' },
    { icon: faRss, href: '/rss.xml', label: 'RSS Feed' },
  ]

  return (
    <div className={cn(
      "relative border-r transition-all duration-300 flex flex-col",
      expanded ? "w-64" : "w-16",
      className
    )}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 h-8 w-8 rounded-full border shadow-md bg-background"
        onClick={() => setExpanded(!expanded)}
      >
        <FontAwesomeIcon icon={faBars} className="h-4 w-4" />
      </Button>

      <div className="flex-1 space-y-4 py-4">
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
            <h2 className="mb-2 px-4 text-2xl font-semibold">PixelCookies</h2>
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
                    className={cn("h-4 w-4", expanded && "mr-2")} 
                  />
                  {expanded && <span>{value.name}</span>}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="px-3 py-4 border-t">
        <div className="flex gap-2 justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent hover:text-accent-foreground"
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
            className="hover:bg-accent hover:text-accent-foreground"
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          >
            <FontAwesomeIcon icon={faGlobe} className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-4 flex justify-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
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
