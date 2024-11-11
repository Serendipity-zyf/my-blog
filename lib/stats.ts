import { createClient } from '@vercel/edge-config'

const config = createClient(process.env.EDGE_CONFIG)

export async function getViewCount() {
  try {
    const views = await config.get('total_views')
    return typeof views === 'number' ? views : 0
  } catch (error) {
    console.error('Failed to get view count:', error)
    return 0
  }
}

// 使用 Edge Config API 更新计数
export async function incrementViewCount() {
  try {
    const token = process.env.EDGE_CONFIG_TOKEN
    const edgeConfigId = process.env.EDGE_CONFIG_ID
    
    if (!token || !edgeConfigId) {
      throw new Error('Missing Edge Config credentials')
    }

    const currentViews = await getViewCount()
    const newViews = currentViews + 1

    const response = await fetch(
      `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              operation: 'update',
              key: 'total_views',
              value: newViews,
            },
          ],
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to update view count')
    }

    return newViews
  } catch (error) {
    console.error('Failed to increment view count:', error)
    return 0
  }
}