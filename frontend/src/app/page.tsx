export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container-custom py-20">
        {/* Hero Section */}
        <div className="text-center animate-fade-in">
          <h1 className="text-6xl font-bold font-heading mb-6 text-gradient">
            Welcome to ShopHub
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            The next-generation e-commerce marketplace with stunning UI and seamless shopping
            experience
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center mb-16">
            <button className="btn btn-primary px-8 py-3 text-base">Start Shopping</button>
            <button className="btn btn-outline px-8 py-3 text-base">Become a Seller</button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {/* Card 1 */}
            <div className="card p-8 group hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                🛍️
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Premium Products</h3>
              <p className="text-gray-600">
                Curated selection of high-quality products from verified sellers worldwide
              </p>
            </div>

            {/* Card 2 */}
            <div className="card p-8 group hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-accent rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                🚀
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Lightning-fast shipping with real-time tracking on all your orders
              </p>
            </div>

            {/* Card 3 */}
            <div className="card p-8 group hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                🔒
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Secure Payments</h3>
              <p className="text-gray-600">
                Multiple payment options with bank-level encryption and fraud protection
              </p>
            </div>
          </div>

          {/* Status Section */}
          <div className="mt-20 glass rounded-2xl p-8">
            <h2 className="text-2xl font-heading font-bold mb-4 text-gray-800">
              🎉 Phase 1 Complete!
            </h2>
            <div className="inline-block">
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-3">
                  <span className="badge badge-success">✓</span>
                  <span className="text-gray-700">Next.js 16 + TypeScript Setup</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="badge badge-success">✓</span>
                  <span className="text-gray-700">Tailwind CSS 4 + Design System</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="badge badge-success">✓</span>
                  <span className="text-gray-700">Custom Fonts & Typography</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="badge badge-success">✓</span>
                  <span className="text-gray-700">Project Structure</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="badge badge-success">✓</span>
                  <span className="text-gray-700">Utilities & TypeScript Types</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
