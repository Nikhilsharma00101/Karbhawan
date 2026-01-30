
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { AccountSidebar } from '@/components/account/sidebar';

export default async function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect('/auth/login?callbackUrl=/account');
    }

    const firstName = session.user.name?.split(' ')[0] || 'User';

    return (
        <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-50/50 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-50/40 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 pt-[220px] pb-20 md:pb-32 px-4 md:px-8 max-w-screen-2xl mx-auto">
                {/* Header Section */}
                <div className="mb-12 md:mb-16">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="w-8 md:w-12 h-[2px] bg-cta-blue" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cta-blue">My Dashboard</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl heading-luxe text-aether-primary uppercase tracking-tighter leading-none">
                                Welcome Back,<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    {firstName}
                                </span>
                            </h1>
                        </div>

                        <div className="hidden md:block text-right">
                            <p className="text-sm font-bold text-aether-secondary max-w-sm border-l-2 border-slate-200 pl-6">
                                Manage your orders, profile, and preferences from your personal dashboard.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Sidebar Navigation */}
                    <AccountSidebar />

                    {/* Main Content Area */}
                    <main className="lg:col-span-9">
                        {/* We can wrap children in a motion div if needed, but for now standard render */}
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
