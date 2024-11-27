import { visit } from 'unist-util-visit'
import type { Root } from 'hast'

export function rehypeImgPath() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        const src = node.properties?.src as string
        if (src && !src.startsWith('http')) {
          node.properties.src = src
        }
      }
    })
  }
} 