import { getPostCount } from '@/lib/posts'
import { getViewCount } from '@/lib/stats'

export async function GET() {
  try {
    const postCount = getPostCount()
    const viewCount = await getViewCount()

    return Response.json({
      posts: postCount,
      views: viewCount
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return Response.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
} 