export default function Posts() {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">文章列表</h1>
        <div className="grid gap-4">
          {/* 这里可以添加文章列表 */}
          <div className="rounded-lg border p-4">
            <h2 className="text-xl font-semibold">示例文章标题</h2>
            <p className="text-sm text-muted-foreground mt-2">
              这是一篇示例文章的摘要...
            </p>
          </div>
        </div>
      </div>
    )
  }