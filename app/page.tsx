import { Zap, Move, ArrowRight, ShoppingBag, Plus } from "lucide-react";

/**
 * CONFIGURAÇÃO EDITORIAL AGRESSIVA (12 COLUNAS)
 * Para um look "Lusano", precisamos de:
 * 1. Espaços vazios gigantes (offsets de coluna via CSS classes).
 * 2. Alturas muito desalinhadas (margens superiores pesadas).
 * 3. Larguras inconsistentes (span 3, 4, 5, 6).
 * 
 * NOTA: Classes CSS customizadas usadas porque Tailwind v4 não processa 
 * classes responsivas dinamicamente em strings interpoladas.
 */
const EDITORIAL_LAYOUT = [
    {
        container: "span-4 start-1 offset-0",
        aspect: "aspect-portrait",
        align: "text-left"
    },
    {
        container: "span-3 start-8 offset-lg",
        aspect: "aspect-square",
        align: "text-left"
    },
    {
        container: "span-5 start-2 offset-negative-sm",
        aspect: "aspect-tall",
        align: "text-right"
    },
    {
        container: "span-4 start-7 offset-sm",
        aspect: "aspect-portrait",
        align: "text-left"
    },
    {
        container: "span-6 start-1 offset-md",
        aspect: "aspect-wide",
        align: "text-left"
    },
    {
        container: "span-3 start-9 offset-negative-md",
        aspect: "aspect-square",
        align: "text-left"
    }
];

export default function App() {
    const products = [
        { id: 1, name: "Cadeira Abstract Oak", slug: "cadeira-oak", price: 1200.00, category: "Industrial", thumbnail: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop" },
        { id: 2, name: "Vaso Cerâmico Minimal", slug: "vaso-minimal", price: 250.00, category: "Curadoria", thumbnail: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=800&auto=format&fit=crop" },
        { id: 3, name: "Luminária Pendant Gold", slug: "luminaria-gold", price: 890.00, category: "Iluminação", thumbnail: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop" },
        { id: 4, name: "Mesa Lateral Nero", slug: "mesa-nero", price: 2100.00, category: "Mobiliário", thumbnail: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop" },
        { id: 5, name: "Objeto de Arte n.05", slug: "arte-05", price: 4500.00, category: "Destaque", thumbnail: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop" },
        { id: 6, name: "Poltrona Velvet Moss", slug: "poltrona-moss", price: 3400.00, category: "Mobiliário", thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop" },
    ];

    return (
        <main className="min-h-screen bg-white relative selection:bg-zinc-900 selection:text-white font-sans text-zinc-900">
            {/* Header */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Zap size={18} fill="currentColor" className="text-zinc-900" />
                    <span className="text-xl font-black tracking-tighter uppercase italic">ANTIGRAVITY</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-6 cursor-pointer hover:opacity-70 transition-opacity text-[10px] font-bold uppercase tracking-widest">
                        Carrinho (0)
                        <ShoppingBag size={18} strokeWidth={1.5} />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="pt-64 pb-32 px-8 max-w-[1800px] mx-auto border-b border-zinc-100 mb-20">
                <h2 className="text-5xl md:text-[12vw] font-light tracking-tighter leading-[0.75] uppercase flex flex-col">
                    <span>Volume</span>
                    <span className="italic text-zinc-300 self-end md:mr-40 font-serif lowercase">Irregular</span>
                </h2>
            </header>

            {/* GRID EDITORIAL - 12 COLUNAS COM OFFSETS REAIS */}
            <section id="produtos" className="px-8 pb-64 max-w-[1800px] mx-auto">
                <div className="editorial-grid">
                    {products.map((product, index) => {
                        const layout = EDITORIAL_LAYOUT[index % EDITORIAL_LAYOUT.length];

                        return (
                            <div
                                key={product.id}
                                className={`group flex flex-col transition-all duration-1000 ease-out ${layout.container} ${layout.align}`}
                            >
                                <a href={`/produto/${product.slug}`} className="block w-full">
                                    {/* Imagem com Aspect Ratio e Container Relativo */}
                                    <div className={`relative overflow-hidden bg-zinc-50 ${layout.aspect} mb-8`}>
                                        <img
                                            src={product.thumbnail}
                                            alt={product.name}
                                            className="h-full w-full object-cover transition-all duration-[1.5s] group-hover:scale-[1.08] grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Plus size={32} strokeWidth={1} className="text-white drop-shadow-2xl" />
                                        </div>
                                    </div>

                                    {/* Info do Produto */}
                                    <div className={`space-y-4 ${layout.align === 'text-right' ? 'pr-2' : 'pl-2'}`}>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-300 font-bold italic">
                                                {product.category}
                                            </span>
                                            <h3 className="text-xl font-light uppercase tracking-tighter text-zinc-900 leading-none">
                                                {product.name}
                                            </h3>
                                        </div>
                                        <div className={`pt-4 border-t border-zinc-100 flex items-center gap-4 opacity-40 group-hover:opacity-100 transition-all duration-700 ${layout.align === 'text-right' ? 'justify-end' : 'justify-start'}`}>
                                            <p className="text-sm font-serif italic text-zinc-400">
                                                R$ {product.price.toFixed(2)}
                                            </p>
                                            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                </div>

                {/* Manifesto do Espaço Negativo */}
                <div className="mt-96 grid grid-cols-12 gap-8 border-t border-zinc-100 pt-32">
                    <div className="col-span-12 md:col-span-8 lg:col-span-6 space-y-16">
                        <h4 className="text-5xl md:text-8xl font-light uppercase tracking-tighter leading-none">
                            O silêncio <br />
                            <span className="italic text-zinc-300 font-serif lowercase">é estrutural.</span>
                        </h4>
                        <div className="flex gap-10 items-start">
                            <div className="p-8 bg-zinc-900 rounded-full text-white shrink-0">
                                <Move size={40} strokeWidth={0.5} />
                            </div>
                            <div className="space-y-8">
                                <p className="text-[11px] text-zinc-400 leading-loose max-w-sm uppercase tracking-[0.3em]">
                                    Ao contrário do e-commerce convencional, aqui o olhar não é forçado a uma leitura linear. O vazio entre os objetos é o que define a sua importância.
                                </p>
                                <button className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-4 group border-b-2 border-zinc-900 pb-2 transition-all">
                                    Explorar Filosofia <ArrowRight size={16} className="group-hover:translate-x-3 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Industrial */}
            <footer className="bg-zinc-50 border-t border-zinc-100 py-40 px-8 text-center">
                <div className="max-w-[1800px] mx-auto flex flex-col items-center gap-12">
                    <Zap size={32} fill="currentColor" className="opacity-10" />
                    <div className="flex flex-wrap justify-center gap-x-20 gap-y-8 text-[11px] font-black uppercase tracking-[0.5em] text-zinc-300">
                        <a href="#" className="hover:text-zinc-900 transition-colors">Instagram</a>
                        <a href="#" className="hover:text-zinc-900 transition-colors">Arquivo</a>
                        <a href="#" className="hover:text-zinc-900 transition-colors">Lisboa</a>
                    </div>
                    <p className="text-[9px] font-bold opacity-20 uppercase tracking-[1em] mt-12">
                        Antigravity Design Lab © 2024
                    </p>
                </div>
            </footer>
        </main>
    );
}