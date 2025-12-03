import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ui/ProductCard';
import { getProducts } from '@/lib/api/products';
import { getCategories } from '@/lib/api/categories';

export default async function Home() {
  // Fetch data
  const [productsData, categoriesData] = await Promise.all([
    getProducts({ per_page: 8, sort_by: 'created_at', sort_order: 'desc' }),
    getCategories()
  ]);

  const products = productsData.data || [];
  const categories = categoriesData.data || [];

  // Mock data for specific sections (since we might not have enough real data yet)
  const smartphones = products.filter((p: any) => p.category?.slug === 'electronics' || p.title.toLowerCase().includes('phone')).slice(0, 5);
  const essentials = products.slice(0, 6);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="bg-gray-50 py-6">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl bg-blue-900 text-white shadow-xl">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

            {/* Decorative Circles */}
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-700/30 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl"></div>

            <div className="relative px-8 py-16 md:px-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl z-10">
                <div className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm border border-white/20">
                  Best Deal Online on smart watches
                </div>
                <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl tracking-tight">
                  SMART WEARABLE.
                </h1>
                <p className="mb-8 text-2xl font-light text-blue-100">
                  UP to 80% OFF
                </p>

                {/* Dots Indicator */}
                <div className="flex gap-2 mb-8">
                  <div className="w-8 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                </div>
              </div>

              {/* Hero Image Placeholder - In a real app this would be a product image */}
              <div className="relative w-full max-w-md aspect-square md:aspect-[4/3] bg-gradient-to-br from-blue-800 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center border border-white/10 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="text-center">
                  <span className="text-6xl">⌚</span>
                  <p className="mt-4 text-blue-100 font-medium">Smart Watch Series 7</p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Grab the best deal on Smartphones */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Grab the best deal on <span className="text-blue-600">Smartphones</span>
            </h2>
            <Link href="/categories/electronics" className="text-blue-600 font-medium flex items-center gap-1 hover:text-blue-700">
              View All <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {products.slice(0, 5).map((product: any) => (
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
                badge={product.is_on_sale ? '56% OFF' : undefined}
                maxQuantity={product.quantity}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Shop From Top Categories */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8 pb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Shop From <span className="text-blue-600">Top Categories</span>
            </h2>
            <Link href="/categories" className="text-blue-600 font-medium flex items-center gap-1 hover:text-blue-700">
              View All <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {categories.slice(0, 7).map((category: any) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group flex flex-col items-center gap-4"
              >
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-4xl shadow-sm group-hover:shadow-md group-hover:bg-blue-50 transition-all duration-300 border border-gray-200 overflow-hidden relative">
                  <div className="absolute inset-0 bg-blue-100 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
                  <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {category.name.charAt(0)}
                  </span>
                </div>
                <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Electronics Brands (Banner Section) */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8 pb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Top <span className="text-blue-600">Electronics Brands</span>
            </h2>
            <Link href="/brands" className="text-blue-600 font-medium flex items-center gap-1 hover:text-blue-700">
              View All <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Brand 1 */}
            <div className="rounded-2xl bg-gray-900 p-6 text-white relative overflow-hidden h-48 flex items-center">
              <div className="z-10">
                <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs inline-block mb-2">IPHONE</div>
                <h3 className="text-3xl font-bold mb-1">Apple</h3>
                <p className="text-gray-300 mb-4">UP to 80% OFF</p>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-gray-800 to-transparent"></div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-8xl opacity-20">🍎</div>
            </div>

            {/* Brand 2 */}
            <div className="rounded-2xl bg-amber-100 p-6 text-gray-900 relative overflow-hidden h-48 flex items-center">
              <div className="z-10">
                <div className="bg-amber-200 px-2 py-1 rounded text-xs font-bold inline-block mb-2 text-amber-900">REALME</div>
                <h3 className="text-3xl font-bold mb-1">realme</h3>
                <p className="text-gray-600 mb-4">UP to 80% OFF</p>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-8xl opacity-20 text-amber-500">📱</div>
            </div>

            {/* Brand 3 */}
            <div className="rounded-2xl bg-blue-100 p-6 text-gray-900 relative overflow-hidden h-48 flex items-center">
              <div className="z-10">
                <div className="bg-blue-200 px-2 py-1 rounded text-xs font-bold inline-block mb-2 text-blue-900">XIAOMI</div>
                <h3 className="text-3xl font-bold mb-1">Xiaomi</h3>
                <p className="text-gray-600 mb-4">UP to 80% OFF</p>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-8xl opacity-20 text-blue-500">⚡</div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Essentials */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8 pb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Daily <span className="text-blue-600">Essentials</span>
            </h2>
            <Link href="/categories/groceries" className="text-blue-600 font-medium flex items-center gap-1 hover:text-blue-700">
              View All <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Daily Essentials', img: '🥦', discount: 'UP to 50% OFF' },
              { name: 'Vegetables', img: '🥕', discount: 'UP to 50% OFF' },
              { name: 'Fruits', img: '🍎', discount: 'UP to 50% OFF' },
              { name: 'Strawberry', img: '🍓', discount: 'UP to 50% OFF' },
              { name: 'Mango', img: '🥭', discount: 'UP to 50% OFF' },
              { name: 'Cherry', img: '🍒', discount: 'UP to 50% OFF' },
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-square rounded-2xl bg-gray-50 flex items-center justify-center text-6xl mb-3 group-hover:bg-gray-100 transition-colors shadow-sm border border-gray-100">
                  {item.img}
                </div>
                <h3 className="text-center font-medium text-gray-700 text-sm mb-1">{item.name}</h3>
                <p className="text-center text-xs font-bold text-gray-900">{item.discount}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / App Download */}
      <section className="bg-blue-600 text-white py-16 mt-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">MegaMart</h2>
              <div className="space-y-4 text-blue-100 text-sm">
                <p className="flex items-center gap-2">
                  <span className="bg-white/20 p-1 rounded">📞</span>
                  <span>Contact Us</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="bg-white/20 p-1 rounded">📱</span>
                  <span>Whats App</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="bg-white/20 p-1 rounded">📍</span>
                  <span>Call Us</span>
                </p>

                <div className="pt-6">
                  <h4 className="font-semibold mb-4">Download App</h4>
                  <div className="flex gap-4">
                    <div className="h-10 w-32 bg-black rounded-lg flex items-center justify-center border border-white/20 cursor-pointer hover:bg-gray-900">App Store</div>
                    <div className="h-10 w-32 bg-black rounded-lg flex items-center justify-center border border-white/20 cursor-pointer hover:bg-gray-900">Google Play</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-6 border-b border-white/20 pb-2 inline-block">Most Popular Categories</h4>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>Staples</li>
                <li>Beverages</li>
                <li>Personal Care</li>
                <li>Home Care</li>
                <li>Baby Care</li>
                <li>Vegetables & Fruits</li>
                <li>Snacks & Foods</li>
                <li>Dairy & Bakery</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 border-b border-white/20 pb-2 inline-block">Customer Services</h4>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>About Us</li>
                <li>Terms & Conditions</li>
                <li>FAQ</li>
                <li>Privacy Policy</li>
                <li>E-waste Policy</li>
                <li>Cancellation & Return Policy</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 text-center text-xs text-blue-200">
            © 2022 All rights reserved. Reliance Retail Ltd.
          </div>
        </div>
      </section>
    </main>
  );
}
