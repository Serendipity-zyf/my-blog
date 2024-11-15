// 计算阅读时间
export function getReadingTime(content: string) {
  const wordsPerMinute = 200; // 假设平均阅读速度为每分钟200字
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}

// 提取文章目录
export function extractTableOfContents(content: string) {
  const headings: { id: string; text: string; level: number }[] = [];
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    headings.push({ id, text, level });
  }

  return headings;
}

// 获取所有标签
export function getAllTags(posts: any[]) {
  const tags = new Set<string>();
  posts.forEach(post => {
    post.tags?.forEach((tag: string) => tags.add(tag));
  });
  return Array.from(tags);
}

// 获取所有分类
export function getAllCategories(posts: any[]) {
  const categories = new Set<string>();
  posts.forEach(post => {
    if (post.category) categories.add(post.category);
  });
  return Array.from(categories);
} 