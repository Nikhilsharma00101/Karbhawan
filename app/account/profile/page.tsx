
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { User, Mail, Phone, ShieldCheck } from "lucide-react";

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user) redirect('/auth/login');

    // User data is from session for now, in robust app fetch from DB to get more fields if needed
    const user = session.user;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <h2 className="text-3xl font-display font-black text-aether-primary uppercase tracking-tight">Profile Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information Card */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                            {user.image ? (
                                <img src={user.image} alt={user.name || "User"} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <User className="w-8 h-8" />
                            )}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-aether-primary">{user.name}</h3>
                            <p className="text-sm text-aether-muted">{user.role === 'ADMIN' ? 'Administrator' : 'Customer'}</p>
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-aether-muted ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    defaultValue={user.name || ""}
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-cta-blue focus:ring-1 focus:ring-cta-blue outline-none transition-all font-medium text-slate-700"
                                    disabled // Disabled for now as we need server action to update
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-aether-muted ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="email"
                                    defaultValue={user.email || ""}
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 cursor-not-allowed"
                                    disabled
                                />
                            </div>
                            <p className="text-[10px] text-slate-400 ml-1">Email address cannot be changed</p>
                        </div>

                        <div className="pt-4">
                            <button type="button" className="btn-primary w-full opacity-50 cursor-not-allowed text-xs py-3">
                                Save Changes (Coming Soon)
                            </button>
                        </div>
                    </form>
                </div>

                {/* Account Security / Info */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Account Security</h3>
                                <p className="text-xs text-slate-400">Your account is secure</p>
                            </div>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                                <span className="text-sm font-medium">Password</span>
                                <span className="text-xs text-slate-400">********</span>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                                <span className="text-sm font-medium">Authentication</span>
                                <span className="text-xs text-slate-400">Standard</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
