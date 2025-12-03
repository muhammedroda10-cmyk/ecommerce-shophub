import RegisterForm from '@/components/features/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <RegisterForm />
            </div>
        </div>
    );
}
