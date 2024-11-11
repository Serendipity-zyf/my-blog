import { createClient } from '@vercel/edge-config'

const config = createClient(process.env.EDGE_CONFIG)

export async function GET() {
  try {
    // 检查是否已经存在计数
    const existingViews = await config.get('total_views')
    
    if (existingViews === undefined) {
      // 如果不存在，初始化为 0
      const token = process.env.EDGE_CONFIG_TOKEN
      const edgeConfigId = process.env.EDGE_CONFIG_ID
      
      if (!token || !edgeConfigId) {
        throw new Error('Missing Edge Config credentials')
      }

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
                operation: 'upsert',
                key: 'total_views',
                value: 0,
              },
            ],
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to initialize view count')
      }
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Failed to initialize stats:', error)
    return Response.json(
      { error: 'Failed to initialize stats' },
      { status: 500 }
    )
  }
}