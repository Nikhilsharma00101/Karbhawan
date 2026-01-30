
"use client"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export function SignOut() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all uppercase tracking-wider group"
        >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Sign Out</span>
        </button>
    )
}
