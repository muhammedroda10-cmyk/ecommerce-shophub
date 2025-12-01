import Link from 'next/link';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="transition-colors hover:text-primary-600">
                Home
            </Link>
            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {item.href ? (
                        <Link href={item.href} className="transition-colors hover:text-primary-600">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-medium text-gray-900">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
