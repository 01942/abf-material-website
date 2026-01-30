import { getLocalData } from "@/lib/data";

export const dynamic = 'force-dynamic';



export default async function Home() {
  const data = await getLocalData();

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Navbar */}
      <nav className="w-full h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/doc/image12.png" alt="Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold tracking-tight text-primary">深圳一捧春晖科技有限公司</span>
        </Link>
        <div className="flex gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/#products" className="hover:text-primary transition-colors">产品中心</Link>
          <Link href="/technology" className="hover:text-primary transition-colors">核心技术</Link>
          <Link href="/about" className="hover:text-primary transition-colors">关于我们</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">联系我们</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 z-0" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/images/doc/image1.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />

        <div className="relative z-10 text-center max-w-4xl px-6">
          <div className="inline-block animate-bounce mb-4">
            <span className="px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-200 text-sm font-medium border border-blue-400/30">
              自主研发 · 国产替代
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            高性能积层胶膜 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              (Build-up Film)
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            专为先进封装 (2.5D/3D, Chiplet) 打造的核心介电材料。 <br />
            突破技术壁垒，赋能中国芯。
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <a href="#products" className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              查看产品
            </a>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="w-full py-24 px-8 max-w-7xl mx-auto bg-background">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">材料解决方案</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">针对先进IC封装的严苛要求而研发，具有超低介电损耗和极高的可靠性。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.products.map((product: any) => (
            <a href={`/products/${product.id}`} key={product.id} className="group relative flex flex-col justify-between p-6 rounded-2xl border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-accent/30 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-sm opacity-80" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{product.description}</p>

                {/* Micro-specs */}
                <div className="space-y-2 mb-6">
                  {Object.entries(product.specs || {}).slice(0, 3).map(([key, val]: any) => (
                    <div key={key} className="flex justify-between text-xs border-b border-border/50 pb-1">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium text-foreground">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full py-2 rounded-lg bg-secondary/30 text-secondary-foreground text-sm font-medium hover:bg-primary hover:text-white transition-colors text-center">
                查看规格书
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* News/Technology Teaser */}
      <section className="w-full py-24 px-8 bg-secondary/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-primary">最新研发动态</h2>
            <div className="space-y-4">
              {data.articles.map((article: any) => (
                <a href={`/news/${article.id}`} key={article.id} className="block bg-background p-6 rounded-xl border border-border shadow-sm hover:border-accent/40 transition-colors cursor-pointer group">
                  <div className="text-xs text-accent font-semibold mb-2 flex justify-between">
                    <span>{article.date}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">阅读全文 &rarr;</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{article.content}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
