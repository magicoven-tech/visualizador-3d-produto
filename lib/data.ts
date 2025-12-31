/**
 * Product Data Architecture
 * Central source of truth for all 3D products in the visualizer
 */

export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    model: string;        // Path to .glb file in /public/assets/3d/
    thumbnail: string;    // Path to .webp thumbnail in /public/assets/images/
    description?: string;
    category: string;     // Added category for the new layout
    // Dynamic Grid Config
    layoutConfig?: {
        aspectClass: string;
        containerClass: string;
    }
}

/**
 * Raw Product Catalog
 */
const RAW_PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Suporte Celular",
        slug: "suporte-celular",
        price: 49.90,
        model: "/assets/3d/phone.glb",
        thumbnail: "/assets/images/phone.webp",
        category: "Industrial",
        description: "Suporte ergonômico para celular com design industrial moderno"
    },
    {
        id: "2",
        name: "Porta Guardanapos",
        slug: "porta-guardanapos",
        price: 39.90,
        model: "/assets/3d/guardanapo.glb",
        thumbnail: "/assets/images/guardanapo.webp",
        category: "Décor",
        description: "Porta guardanapos com geometria minimalista"
    },
    {
        id: "3",
        name: "Mosquetão",
        slug: "mosquetao",
        price: 29.90,
        model: "/assets/3d/mosquetao.glb",
        thumbnail: "/assets/images/mosquetao.webp",
        category: "Tático",
        description: "Mosquetão tático em acabamento técnico"
    },
    {
        id: "4",
        name: "Isqueiro",
        slug: "isqueiro",
        price: 59.90,
        model: "/assets/3d/isqueiro_lunar.glb",
        thumbnail: "/assets/images/isqueiro.webp",
        category: "Acessórios",
        description: "Isqueiro lunar com detalhes de precisão"
    }
];

/**
 * PADRÃO EDITORIAL "BROKEN GRID"
 * 
 * Lógica:
 * 1. Aspect Ratios variados (3:4 para verticalidade, Square para equilíbrio, 16:9 para destaque).
 * 2. Offsets Agressivos: lg:mt-48, lg:mt-64 criam o respiro necessário para o look editorial.
 * 3. Hierarquia Visual: Alguns itens ocupam 2 colunas para quebrar a monotonia.
 * 4. Alinhamentos de Texto: Alternância entre left e right para guiar o olhar em "Z".
 */
const calculateLayoutManifest = (products: Product[]): Product[] => {
    const LAYOUT_PATTERN = [
        { aspectClass: "aspect-[3/4]", containerClass: "lg:col-span-1 mt-0 text-left" },
        { aspectClass: "aspect-square", containerClass: "lg:col-span-1 mt-20 lg:mt-64 text-right" },
        { aspectClass: "aspect-[4/5]", containerClass: "lg:col-span-1 mt-0 lg:mt-12 text-left" },
        { aspectClass: "aspect-[3/4]", containerClass: "lg:col-span-1 mt-10 lg:mt-32 text-left" },
        // Item de destaque (Hero Product - Quebra o grid)
        { aspectClass: "aspect-[16/9]", containerClass: "lg:col-span-2 mt-20 lg:mt-40 lg:mx-10 text-center" },
        { aspectClass: "aspect-square", containerClass: "lg:col-span-1 mt-0 text-left" },
        { aspectClass: "aspect-[3/4]", containerClass: "lg:col-span-1 mt-20 lg:mt-56 text-right" },
        { aspectClass: "aspect-[4/5]", containerClass: "lg:col-span-1 mt-10 text-left" },
    ];

    return products.map((product, index) => {
        const config = LAYOUT_PATTERN[index % LAYOUT_PATTERN.length];

        return {
            ...product,
            layoutConfig: config
        };
    });
};

export const PRODUCTS = calculateLayoutManifest(RAW_PRODUCTS);

/**
 * Helper functions
 */
export const getProductBySlug = (slug: string): Product | undefined => {
    return PRODUCTS.find(product => product.slug === slug);
};

export const getAllProducts = (): Product[] => {
    return PRODUCTS;
};
