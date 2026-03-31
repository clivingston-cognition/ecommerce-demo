import Image from "next/image";
import Link from "next/link";
import {
  demoProducts,
  demoSearchSuggestions,
  demoDealCards,
  demoLifestyleSections,
  demoPopularCategories,
} from "@/lib/demo-data";

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
  return 3 + ((id * 7 + 3) % 10) / 10 * 2;
}

function seededReviewCount(id: number): number {
  return 50 + ((id * 137 + 29) % 450);
}

function seededBoughtCount(id: number): number {
  return 100 + ((id * 53 + 17) % 900);
}

/** Product card for horizontal carousel */
function CarouselProductCard({
  product,
}: {
  product: (typeof demoProducts)[number];
}) {
  const productLink = `/${product.category}/${product.id}?variant=${product.variants[0].color}`;

  return (
    <Link href={productLink} className="demo-carousel-card">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.img}
          alt={product.name}
          fill
          sizes="220px"
          className="object-cover"
        />
        {product.price > 200 && (
          <span className="absolute top-2 left-2 demo-badge">Top Seller</span>
        )}
      </div>
      <div className="demo-carousel-card-body">
        <p className="demo-carousel-bought">
          {seededBoughtCount(product.id)} bought last week
        </p>
        <h3 className="text-sm leading-tight mb-1 line-clamp-2 font-medium">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-1">
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
    <div className="demo-home">
      {/* Section 1: Recommended Searches */}
      <section className="demo-search-pills-section">
        <div className="demo-search-pills-wrap">
          <span className="demo-search-pills-label">Recommended Searches</span>
          <div className="demo-search-pills">
            {demoSearchSuggestions.map((term) => (
              <Link key={term} href="#" className="demo-pill">
                {term}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Deal Cards Grid */}
      <section className="demo-deals-section">
        <div className="demo-section-inner">
          <div className="demo-deals-grid">
            {demoDealCards.map((deal) => (
              <Link key={deal.title} href={deal.link} className="demo-deal-card">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover"
                  />
                </div>
                <div className="demo-deal-card-body">
                  <h3 className="font-bold text-sm">{deal.title}</h3>
                  <p className="demo-deal-price">{deal.price}</p>
                  {deal.unit && (
                    <p className="text-xs text-gray-500">{deal.unit}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Shop Fresh Savings for Spring - Product Carousel */}
      <section className="demo-carousel-section">
        <div className="demo-section-inner">
          <h2 className="demo-section-heading">
            Shop Fresh Savings for Spring
          </h2>
          <div className="demo-carousel-tabs">
            <button type="button" className="demo-tab demo-tab-active">Top Picks</button>
            <button type="button" className="demo-tab">Outdoors</button>
            <button type="button" className="demo-tab">Plumbing</button>
            <button type="button" className="demo-tab">Flooring</button>
            <button type="button" className="demo-tab">Building Supplies</button>
            <button type="button" className="demo-tab">Storage</button>
            <button type="button" className="demo-tab">Paint</button>
            <button type="button" className="demo-tab">Electrical</button>
            <button type="button" className="demo-tab">Home Decor</button>
            <button type="button" className="demo-tab">Kitchen</button>
          </div>
          <div className="demo-carousel-scroll">
            {demoProducts.map((product) => (
              <CarouselProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4-6: Lifestyle 2-Card Sections */}
      {demoLifestyleSections.map((section) => (
        <section key={section.heading} className="demo-lifestyle-section">
          <div className="demo-section-inner">
            <h2 className="demo-section-heading">{section.heading}</h2>
            <div className="demo-lifestyle-grid">
              {section.cards.map((card) => (
                <Link key={card.title} href={card.link} className="demo-lifestyle-card group">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="demo-lifestyle-card-body">
                    <h3 className="font-bold text-lg mb-1">{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.description}</p>
                    <span className="demo-lifestyle-shop-link">
                      Shop Now &gt;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Section 7: Popular Categories Grid */}
      <section className="demo-popular-section">
        <div className="demo-section-inner">
          <h2 className="demo-section-heading">Popular Categories</h2>
          <div className="demo-popular-grid">
            {demoPopularCategories.map((cat) => (
              <Link key={cat.label} href={`/${cat.slug}`} className="demo-popular-item">
                <div className="demo-popular-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </div>
                <span className="text-xs text-center font-medium leading-tight">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Projects & Updates */}
      <section className="demo-projects-section">
        <div className="demo-section-inner">
          <h2 className="demo-section-heading">
            Renew Your Home With Projects &amp; Updates
          </h2>
          <div className="demo-projects-grid">
            {[
              { title: "How to Build a Deck", image: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=400&h=300&fit=crop" },
              { title: "Bathroom Remodel Ideas", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop" },
              { title: "Paint Color Inspiration", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop" },
              { title: "Spring Lawn Care Tips", image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&h=300&fit=crop" },
              { title: "Smart Home Setup Guide", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop" },
              { title: "Kitchen Renovation 101", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop" },
            ].map((project) => (
              <Link key={project.title} href="#" className="demo-project-card group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-medium mt-2">{project.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
