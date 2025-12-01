import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200 bg-gray-50 pt-16 pb-8">
            <div className="container-custom">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-white shadow-soft">
                                <span className="text-lg font-bold">S</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight">ShopHub</span>
                        </Link>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                            Your premium destination for quality products. Curated collections for the modern lifestyle.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                                <a
                                    key={social}
                                    href={`#${social}`}
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-all hover:bg-primary-500 hover:text-white hover:shadow-glow"
                                >
                                    <span className="sr-only">{social}</span>
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-900">Shop</h4>
                        <ul className="space-y-3 text-sm">
                            {['Electronics', 'Fashion', 'Home & Living', 'Sports', 'New Arrivals'].map((item) => (
                                <li key={item}>
                                    <Link href={`/category/${item.toLowerCase().replace(/ /g, '-')}`} className="text-gray-500 transition-colors hover:text-primary-600 hover:translate-x-1 inline-block">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-900">Support</h4>
                        <ul className="space-y-3 text-sm">
                            {['Help Center', 'Track Order', 'Returns & Exchanges', 'Shipping Info', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-gray-500 transition-colors hover:text-primary-600 hover:translate-x-1 inline-block">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-900">Stay Updated</h4>
                        <p className="mb-4 text-sm text-gray-500">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                            <button className="btn btn-primary w-full shadow-soft hover:shadow-glow">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-xs text-gray-400">
                            © {currentYear} ShopHub. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-xs text-gray-400">
                            <Link href="/privacy" className="hover:text-primary-600 transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-primary-600 transition-colors">Terms of Service</Link>
                            <Link href="/cookies" className="hover:text-primary-600 transition-colors">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
