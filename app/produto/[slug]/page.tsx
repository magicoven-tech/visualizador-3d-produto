import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/lib/data";
import { Button } from "@/components/ui/button";

interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const products = getAllProducts();
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
                <div className="flex items-center justify-between px-6 py-4">
                    <Link href="/" className="industrial-text text-xs tracking-widest">
                        3DGE STUDIO
                    </Link>
                    <nav className="flex items-center gap-8">
                        <Link
                            href="/#produtos"
                            className="industrial-text text-xs tracking-wide hover:text-accent transition-colors"
                        >
                            PRODUTOS
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Product View */}
            <div className="pt-20 grid grid-cols-12 min-h-screen">
                {/* 3D Canvas Area */}
                <div className="col-span-8 relative canvas-container flex items-center justify-center">
                    <div className="industrial-text text-foreground/20">
                        3D VIEWER - {product.name.toUpperCase()}
                    </div>
                    {/* React Three Fiber canvas will be added here */}
                </div>

                {/* Product Info Sidebar */}
                <aside className="col-span-4 border-l border-border p-8 flex flex-col">
                    <div className="flex-1">
                        {/* Product Code */}
                        <p className="tech-data text-xs mb-4">
                            PROD/{product.id.padStart(4, "0")}
                        </p>

                        {/* Product Name */}
                        <h1 className="industrial-heading text-4xl mb-4">
                            {product.name}
                        </h1>

                        {/* Description */}
                        <p className="text-foreground/60 mb-8">
                            {product.description}
                        </p>

                        {/* Price */}
                        <div className="mb-8">
                            <p className="tech-data text-xs mb-1">PRECO</p>
                            <p className="font-mono text-3xl neon-accent">
                                R$ {product.price.toFixed(2)}
                            </p>
                        </div>

                        {/* Technical Specs Placeholder */}
                        <div className="space-y-4 border-t border-border pt-8">
                            <p className="tech-data text-xs">ESPECIFICACOES TECNICAS</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-foreground/40">Material</p>
                                    <p className="font-mono">PLA+</p>
                                </div>
                                <div>
                                    <p className="text-foreground/40">Densidade</p>
                                    <p className="font-mono">20%</p>
                                </div>
                                <div>
                                    <p className="text-foreground/40">Resolucao</p>
                                    <p className="font-mono">0.2mm</p>
                                </div>
                                <div>
                                    <p className="text-foreground/40">Tempo</p>
                                    <p className="font-mono">4h 30m</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                        <Button
                            className="w-full bg-foreground text-background hover:bg-accent hover:text-foreground rounded-none industrial-text"
                        >
                            PERSONALIZAR
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full rounded-none industrial-text"
                        >
                            ADICIONAR AO CARRINHO
                        </Button>
                    </div>
                </aside>
            </div>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 px-6 py-4">
                <p className="tech-data text-xs text-foreground/40">
                    PRESS D FOR DEBUG GRID - PRESS H FOR CONTROLS
                </p>
            </footer>
        </main>
    );
}
