import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800 text-white">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="container-custom relative py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
              <span>✨</span>
              <span>New arrivals every week</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Discover Amazing Products
              <span className="block bg-gradient-to-r from-accent-400 to-pink-400 bg-clip-text text-transparent">
                From Trusted Sellers
              </span>
            </h1>
            <p className="mb-8 text-lg text-white/90 md:text-xl">
              Shop from thousands of products across multiple categories. Quality guaranteed, fast shipping.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-primary-700 shadow-lg transition-transform hover:scale-105"
              >
                🛍️ Browse Products →
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-8 py-4 font-semibold transition-colors hover:bg-white hover:text-primary-700"
              >
                Start Selling
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-3xl">
                🚚
              </div>
              <h3 className="mb-2 text-xl font-semibold">Free Shipping</h3>
              <p className="text-gray-600">On orders over $50</p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-100 text-3xl">
                🛡️
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure Payment</h3>
              <p className="text-gray-600">100% secure transactions</p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-3xl">
                ↩️
              </div>
              <h3 className="mb-2 text-xl font-semibold">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <h2 className="mb-8 text-center text-3xl font-bold">Shop by Category</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {['Electronics', 'Fashion', 'Home & Living', 'Sports'].map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase().replace(' & ', '-')}`}
                className="group relative overflow-hidden rounded-xl bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 text-4xl">📦</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-custom">
          <div className="overflow-hidden rounded-2xl bg-gradient-primary p-8 text-center text-white md:p-12">
            <h2 className="mb-4 text-3xl font-bold">Ready to Start Shopping?</h2>
            <p className="mb-6 text-lg text-white/90">
              Join thousands of happy customers today
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/products"
                className="btn bg-white text-primary-700 hover:bg-gray-100"
              >
                View All Products
              </Link>
              <Link
                href="/login"
                className="btn border-2 border-white bg-transparent hover:bg-white hover:text-primary-700"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
