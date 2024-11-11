import { sql } from '@vercel/postgres';

export async function getViewCount(): Promise<number> {
  try {
    // 从 views 表获取当前访问量
    const result = await sql`
      SELECT count FROM views WHERE id = 'total' LIMIT 1
    `;
    
    // 如果没有记录，返回0
    if (result.rows.length === 0) return 0;
    
    return result.rows[0].count;
  } catch (error) {
    console.error('Failed to get view count:', error);
    return 0;
  }
}

export async function incrementViewCount(): Promise<number | null> {
  try {
    // 使用 UPSERT 来更新或插入访问量
    const result = await sql`
      INSERT INTO views (id, count)
      VALUES ('total', 1)
      ON CONFLICT (id)
      DO UPDATE SET count = views.count + 1
      RETURNING count
    `;
    
    return result.rows[0].count;
  } catch (error) {
    console.error('Failed to increment view count:', error);
    return null;
  }
}