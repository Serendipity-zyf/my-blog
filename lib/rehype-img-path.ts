import { visit } from 'unist-util-visit'
import type { Root } from 'hast'

export function rehypeImgPath() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        const src = node.properties?.src as string
        console.log('Original image src:', src) // 添加日志
        if (src && !src.startsWith('http') && !src.startsWith('/')) {
          node.properties.src = `/posts/images/${src}`
          console.log('Modified image src:', node.properties.src) // 添加日志
        }
      }
    })
  }
} 