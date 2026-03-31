import Image from "next/image";
import Link from "next/link";
import { demoProducts, demoCategories } from "@/lib/demo-data";

/** Star rating display */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="demo-stars text-sm">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < Math.floor(rating) ? "\u2605" : "\u2606"}</span>
      ))}
    </span>
  );
}

/** Deterministic pseudo-random from product id for consistent rendering */
function seededRating(id: number): number {
  return 4 + ((id * 7 + 3) % 10) / 10;
}

function seededReviewCount(id: number): number {
  return 50 + ((id * 137 + 29) % 450);
}

/** Individual product card */
function DemoProductCard({
  product,
}: {
  product: (typeof demoProducts)[number];
}) {
  const productLink = `/${product.category}/${product.id}?variant=${product.variants[0].color}`;

  return (
    <Link href={productLink} className="block demo-product-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.img}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
        {product.price > 200 && (
          <span className="absolute top-2 left-2 demo-badge">Top Seller</span>
        )}
      </div>
      <div className="demo-card-body">
        <h2 className="text-sm leading-tight mb-1 line-clamp-2">
          {product.name}
        </h2>
        <p className="demo-desc line-clamp-2 mb-2">{product.description}</p>
        <div className="flex items-center gap-2 mb-1">
          <Stars rating={seededRating(product.id)} />
          <span className="text-xs text-gray-400">
            ({seededReviewCount(product.id)})
          </span>
        </div>
        <div className="demo-price">${product.price.toFixed(2)}</div>
        {product.price > 100 && (
          <div className="text-xs text-green-600 mt-1 font-medium">
            Free Shipping
          </div>
        )}
      </div>
    </Link>
  );
}

export const DemoHomePage = () => {
  return (
    <div className="-mx-6 sm:-mx-12">
      {/* Hero Banner */}
      <section className="demo-hero px-6 sm:px-12 py-16 sm:py-24">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center gap-8">
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">
              Spring Into Savings
            </h1>
            <p className="text-lg sm:text-xl opacity-90 mb-8 max-w-lg">
              Get your home ready for the season with deals on tools, appliances,
              and outdoor essentials.
            </p>
            <Link href="/t-shirts" className="demo-hero-cta text-sm uppercase tracking-wider">
              Shop All Deals
            </Link>
          </div>
          <div className="flex-1 relative hidden md:block">
            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop"
                alt="Home improvement tools on workbench"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 0vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-6 sm:px-12 py-12">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="demo-section-heading text-2xl mb-8">
            Shop by Department
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="demo-category-card group"
              >
                <div className="relative aspect-[2/1] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg mb-1">{cat.label}</h3>
                  <p className="text-sm">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-6 sm:px-12 py-12">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="demo-section-heading text-2xl mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoProducts.slice(0, 8).map((product) => (
              <DemoProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Props Banner */}
      <section className="px-6 sm:px-12 py-10 bg-gray-50">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <div className="text-2xl mb-2">&#x1F69A;</div>
            <h3 className="text-sm font-bold mb-1" style={{ color: "#1a1a2e" }}>
              Free Shipping
            </h3>
            <p className="text-xs text-gray-500">On orders over $45</p>
          </div>
          <div className="p-4">
            <div className="text-2xl mb-2">&#x1F527;</div>
            <h3 className="text-sm font-bold mb-1" style={{ color: "#1a1a2e" }}>
              Expert Advice
            </h3>
            <p className="text-xs text-gray-500">
              In-store and online help
            </p>
          </div>
          <div className="p-4">
            <div className="text-2xl mb-2">&#x1F4B0;</div>
            <h3 className="text-sm font-bold mb-1" style={{ color: "#1a1a2e" }}>
              Price Match
            </h3>
            <p className="text-xs text-gray-500">
              Guaranteed lowest prices
            </p>
          </div>
          <div className="p-4">
            <div className="text-2xl mb-2">&#x21A9;&#xFE0F;</div>
            <h3 className="text-sm font-bold mb-1" style={{ color: "#1a1a2e" }}>
              Easy Returns
            </h3>
            <p className="text-xs text-gray-500">90-day return policy</p>
          </div>
        </div>
      </section>

      {/* More Products */}
      <section className="px-6 sm:px-12 py-12">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="demo-section-heading text-2xl mb-8">
            More to Explore
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoProducts.slice(8).map((product) => (
              <DemoProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
