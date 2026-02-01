import { getLocalData } from "@/lib/data";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';



export default async function Home() {
  const data = await getLocalData();

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Navbar */}
      <nav className="w-full h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="AEM Logo" className="h-10 w-auto mr-2" />
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
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/images/doc/image4.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />

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

      {/* Product Series Section */}
      <section id="products" className="w-full py-24 px-8 max-w-7xl mx-auto bg-background">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent inline-block mb-4">
            全系列解决方案
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            从封装基板到柔性电路，我们提供覆盖全场景的高性能胶膜材料
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* F Series */}
          <div className="group bg-card border border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:border-primary/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-blue-500/20" />
            <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
              <span className="text-primary">F系列</span> 封装胶膜
            </h3>
            <p className="text-muted-foreground mb-6">高性能计算、Chiplet、AI服务器首选。</p>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {data.products.filter((p: any) => p.series === 'F').map((p: any) => (
                  <Link key={p.id} href={`/products/${p.id}`} className="px-3 py-1 bg-secondary rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                    {p.name.split(' ')[0]}
                  </Link>
                ))}
              </div>
              <p className="text-xs text-muted-foreground pt-2">特点：低CTE、低损耗、细线路加工(SAP)</p>
            </div>
          </div>

          {/* RC Series */}
          <div className="group bg-card border border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:border-accent/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-purple-500/20" />
            <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
              <span className="text-accent">RC系列</span> 覆铜胶膜
            </h3>
            <p className="text-muted-foreground mb-6">高阶HDI、埋入式器件、厚铜填胶。</p>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {data.products.filter((p: any) => p.series === 'RC').map((p: any) => (
                  <Link key={p.id} href={`/products/${p.id}`} className="px-3 py-1 bg-secondary rounded-full text-sm font-medium hover:bg-accent hover:text-white transition-colors">
                    {p.name.split(' ')[0]}
                  </Link>
                ))}
              </div>
              <p className="text-xs text-muted-foreground pt-2">特点：兼容传统压合、优异填充性</p>
            </div>
          </div>

          {/* CL Series */}
          <div className="group bg-card border border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:border-green-500/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-green-500/20" />
            <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
              <span className="text-green-600">CL系列</span> 柔性胶膜
            </h3>
            <p className="text-muted-foreground mb-6">FPC软板、动态折叠应用。</p>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {data.products.filter((p: any) => p.series === 'CL').map((p: any) => (
                  <Link key={p.id} href={`/products/${p.id}`} className="px-3 py-1 bg-secondary rounded-full text-sm font-medium hover:bg-green-600 hover:text-white transition-colors">
                    {p.name.split(' ')[0]}
                  </Link>
                ))}
              </div>
              <p className="text-xs text-muted-foreground pt-2">特点：高延伸率、耐折、高粘接力</p>
            </div>
          </div>

          {/* TC Series */}
          <div className="group bg-card border border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:border-orange-500/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-orange-500/20" />
            <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
              <span className="text-orange-600">TC系列</span> 特种胶膜
            </h3>
            <p className="text-muted-foreground mb-6">板级封装(PLP)与高功率散热。</p>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {data.products.filter((p: any) => p.series === 'TC').map((p: any) => (
                  <Link key={p.id} href={`/products/${p.id}`} className="px-3 py-1 bg-secondary rounded-full text-sm font-medium hover:bg-orange-600 hover:text-white transition-colors">
                    {p.name.split(' ')[0]}
                  </Link>
                ))}
              </div>
              <p className="text-xs text-muted-foreground pt-2">特点：极低CTE (13ppm)、高导热(8W)</p>
            </div>
          </div>
        </div>
      </section>



      {/* Application Scenarios - New Section */}
      <section className="w-full py-24 px-8 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent inline-block mb-4">
              核心应用场景
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              赋能前沿电子制造，从芯片封装到系统集成
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.applications?.map((app: any) => (
              <div key={app.id} className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={app.imageUrl}
                    alt={app.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-primary group-hover:text-accent transition-colors">
                    {app.title.split('(')[0]}
                    <span className="block text-xs font-normal text-muted-foreground mt-1">
                      {app.title.match(/\((.*?)\)/)?.[1]}
                    </span>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {app.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section Highlights - Enhanced */}
      <section className="w-full py-24 px-8 bg-secondary/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">研发与制造</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {data.general?.about?.content?.split('\n')[0]}
            </p>
            <div className="grid grid-cols-1 gap-6 pt-4">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold text-foreground">研发实力</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {data.general?.about?.subsections?.[0]?.content}
                </p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-bold text-foreground">制造能力</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {data.general?.about?.subsections?.[1]?.content}
                </p>
              </div>
            </div>
            <div className="pt-4">
              <Link href="/about" className="text-primary font-medium hover:underline underline-offset-4">
                了解更多关于我们 &rarr;
              </Link>
            </div>
          </div>
          <div className="relative h-[500px] bg-card rounded-2xl overflow-hidden shadow-2xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/doc/image1.jpeg" alt="R&D Lab" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white font-medium">拥有近千平米先进材料研发实验室</p>
            </div>
          </div>
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
    </main >
  );
}
