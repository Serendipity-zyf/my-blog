"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"

interface TechInfo {
  icon: IconDefinition
  name: string
  desc: string
}

interface CardStackProps {
  items: {
    id: number
    tech1: TechInfo
    tech2: TechInfo
  }[]
  offset?: number
  scaleFactor?: number
  expanded?: boolean
  onCardClick?: () => void
}

export default function CardStack({
  items,
  offset = 8,
  scaleFactor = 0.06,
  expanded = true,
  onCardClick,
}: CardStackProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [cards, setCards] = useState(items)

  // 添加点击处理函数
  const handleCardClick = (index: number) => {
    if (onCardClick) {
      onCardClick();
    }
    setCards(prev => {
      const newCards = [...prev];
      const clickedCard = newCards[index];
      newCards.splice(index, 1);
      newCards.push(clickedCard);
      return newCards;
    });
  };

  useEffect(() => {
    setCards(items);
  }, [items]);

  // 收起时的简化版视图
  if (!expanded) {
    return (
      <div className="flex flex-col gap-2 items-center">
        {items.flatMap(item => [
          <motion.div
            key={`${item.id}-1`}
            className={cn(
              "w-10 h-10 rounded-lg border",
              "bg-background/50 backdrop-blur-sm",
              "flex items-center justify-center",
              "transition-all duration-300",
              hoveredIndex === item.id && "border-primary"
            )}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
            onHoverStart={() => setHoveredIndex(item.id)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <FontAwesomeIcon
              icon={item.tech1.icon}
              className={cn(
                "h-5 w-5",
                "text-primary",
                "transition-all duration-300",
                hoveredIndex === item.id && "scale-110"
              )}
            />
          </motion.div>,
          <motion.div
            key={`${item.id}-2`}
            className={cn(
              "w-10 h-10 rounded-lg border",
              "bg-background/50 backdrop-blur-sm",
              "flex items-center justify-center",
              "transition-all duration-300",
              hoveredIndex === -item.id && "border-primary"
            )}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
            onHoverStart={() => setHoveredIndex(-item.id)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <FontAwesomeIcon
              icon={item.tech2.icon}
              className={cn(
                "h-5 w-5",
                "text-primary",
                "transition-all duration-300",
                hoveredIndex === -item.id && "scale-110"
              )}
            />
          </motion.div>
        ])}
      </div>
    )
  }

  // 展开时的原始视图
  return (
    <div className="relative h-40">
      {cards.map((item, index) => (
        <motion.div
          key={item.id}
          onClick={() => handleCardClick(index)}
          className={cn(
            "absolute inset-0 h-full w-full rounded-xl border",
            "bg-background/50 backdrop-blur-sm p-4",
            "hover:cursor-pointer transition-all duration-300",
            "overflow-hidden",
            hoveredIndex === index && "border-primary"
          )}
          style={{
            transformOrigin: "top center",
          }}
          initial={{ scale: 1 - index * scaleFactor, y: index * offset }}
          animate={{
            scale: 1 - index * scaleFactor,
            y: index * offset,
            zIndex: hoveredIndex === index ? cards.length : cards.length - index,
            rotateX: hoveredIndex === index ? 5 : 0,
          }}
          whileHover={{
            scale: 1.02,
            y: index * offset - 10,
            rotateX: 5,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          <div className="flex flex-col gap-3 relative h-full">
            {/* 第一个技术 */}
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={item.tech1.icon}
                className={cn(
                  "h-6 w-6",
                  "text-primary",
                  "transition-all duration-300",
                  hoveredIndex === index && "scale-110"
                )}
              />
              <div>
                <p className="font-medium text-sm">{item.tech1.name}</p>
                <p className="text-xs text-muted-foreground">{item.tech1.desc}</p>
              </div>
            </div>

            {/* 隔线 */}
            <div className="border-t border-dashed opacity-30" />

            {/* 第二个技术 */}
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={item.tech2.icon}
                className={cn(
                  "h-6 w-6",
                  "text-primary",
                  "transition-all duration-300",
                  hoveredIndex === index && "scale-110"
                )}
              />
              <div>
                <p className="font-medium text-sm">{item.tech2.name}</p>
                <p className="text-xs text-muted-foreground">{item.tech2.desc}</p>
              </div>
            </div>

            {/* 添加右下角文字 */}
            <span
              className={cn(
                "absolute bottom-[-8px] right-[-8px]",
                "text-3xl font-decorative italic opacity-20",
                "select-none pointer-events-none",
                hoveredIndex === index && "opacity-40"
              )}
            >
              Techs
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
