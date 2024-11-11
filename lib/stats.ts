import { createClient } from '@vercel/edge-config';

const config = createClient(process.env.EDGE_CONFIG!);

export async function getViewCount(): Promise<number> {
  try {
    if (!config) {
      console.warn('Edge Config not initialized');
      return 0;
    }

    const views = await config.get<number>('views');
    return views ?? 0;
  } catch (error) {
    console.error('Failed to get view count:', error);
    return 0;
  }
}

export async function incrementViewCount(): Promise<number | null> {
  try {
    if (!config) {
      console.warn('Edge Config not initialized');
      return null;
    }

    const currentViews = await getViewCount();
    // 注意：Edge Config 实际上并不支持直接的 set 操作
    // 这里需要使用 Vercel KV 或其他存储解决方案来实现计数器功能
    return currentViews;
  } catch (error) {
    console.error('Failed to increment view count:', error);
    return null;
  }
}