import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ui/ProductCard';
import { getProducts } from '@/lib/api/products';
import { getCategories } from '@/lib/api/categories';

export default async function Home() {
  // Fetch data
  const [productsData, categoriesData] = await Promise.all([
    getProducts({ limit: 8, sort: 'newest' }),
    getCategories()
  ]);

  const products = productsData.data || [];
  const categories = categoriesData.data || [];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container-custom relative py-20 md:py-32">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="text-center md:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm border border-white/20">
                <span className="animate-pulse">✨</span>
                <span>New Summer Collection Available</span>
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
                Discover Quality <br />
                <span className="bg-gradient-to-r from-accent-400 to-pink-400 bg-clip-text text-transparent">
                  Premium Products
                </span>
              </h1>
              <p className="mb-8 text-lg text-gray-300 md:text-xl max-w-lg mx-auto md:mx-0">
                Shop from thousands of curated items across multiple categories. Fast shipping, secure payment, and 24/7 support.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                <Link
                  href="/products"
                  className="btn bg-white text-primary-900 hover:bg-gray-100 font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                  Shop Now
                </Link>
                <Link
                  href="/categories"
                  className="btn border-2 border-white/30 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
                >
                  View Categories
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              {/* Abstract decorative elements */}
              <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-b border-gray-100 bg-white">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: '🛡️', title: 'Secure Payment', desc: '100% secure transactions' },
              { icon: '↩️', title: 'Easy Returns', desc: '30-day return policy' },
              { icon: '💬', title: '24/7 Support', desc: 'Expert customer service' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl p-4 transition-colors hover:bg-gray-50">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-2xl">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
              <p className="mt-2 text-gray-600">Explore our wide range of collections</p>
            </div>
            <Link href="/categories" className="hidden text-primary-600 hover:text-primary-700 font-medium md:block">
              View All Categories →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 4).map((category: any) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="aspect-[4/3] bg-gray-100 relative">
                  {/* Placeholder for category image if not available */}
                  <div className="absolute inset-0 flex items-center justify-center text-4xl bg-primary-50 text-primary-200">
                    {category.name.charAt(0)}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 transition-opacity group-hover:opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.products_count || 0} Products</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/categories" className="btn btn-secondary w-full">
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="mt-2 text-gray-600">Our latest and greatest arrivals</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product: any) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                slug={product.slug}
                price={product.price}
                comparePrice={product.compare_price}
                image={product.images?.[0]?.url || '/placeholder.jpg'}
                rating={product.rating}
                reviewCount={product.review_count}
                badge={product.is_new ? 'New' : undefined}
                maxQuantity={product.quantity}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/products" className="btn btn-primary px-8 py-3">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container-custom">
          <div className="rounded-3xl bg-white/5 p-8 md:p-16 border border-white/10 backdrop-blur-sm text-center max-w-4xl mx-auto">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Subscribe to our Newsletter</h2>
            <p className="mb-8 text-lg text-primary-100">
              Get the latest updates on new products and upcoming sales.
            </p>
            <form className="flex flex-col gap-4 sm:flex-row sm:justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500 w-full"
              />
              <button className="btn bg-accent-500 hover:bg-accent-600 text-white font-bold whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

