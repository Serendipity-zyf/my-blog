// import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">欢迎来到我的博客</h1>
      <p className="text-muted-foreground">
        这是一个使用 Next.js 和 Tailwind CSS 构建的个人博客。
      </p>
      <div className="grid gap-4">
        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-2">最新文章</h2>
          <p className="text-sm text-muted-foreground">
            这里将显示最新的博客文章列表...
          </p>
        </div>
      </div>
    </div>
  );
}
