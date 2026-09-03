"use client"
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {signIn, signUp} from "@/lib/auth-client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {FaGithub, FaGoogle} from "react-icons/fa";
import {Separator} from "@base-ui/react";
import {handleEntrypoints} from "next/dist/server/dev/turbopack-utils";
import Link from "next/link";

export default function SignUpPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await signUp.email({
            name,
            email,
            password,
        });

        if (result.error) {
            setError(result.error.message || "An error occurred");
            setLoading(false);
        } else {
            router.push("/repos");
        }
    }

    const handleGithubSignIn = async () => {
        setError("");
        setLoading(true);

        await signIn.social({
            provider: "github",
            callbackURL: "/repos",
        })
    }

    const handleGoogleSignIn = async () => {
        setError("");
        setLoading(true);

        await signIn.social({
            provider: "google",
            callbackURL: "/repos",
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#1e222b] p-4 font-sans text-white selection:bg-[#2086fe]">
            {/* Main Container mirroring the image card canvas */}
            <div className="relative flex min-h-[580px] w-full max-w-[840px] overflow-hidden rounded-2xl bg-[#232732] shadow-2xl">

                {/* Left Side: Form Content */}
                <div className="z-10 flex w-full flex-col justify-between p-10 md:w-7/12">

                    {/* Header: Logo & Nav */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 font-semibold tracking-wide">
                            <span className="h-4 w-4 rounded-full bg-[#2086fe]"></span>
                            Eluxe PR.
                        </div>
                        <div className="flex gap-6 text-gray-400">
                            <a href="#home" className="hover:text-white transition-colors">Home</a>
                            <a href="/sign-in" className="text-gray-300 hover:text-white transition-colors">Join</a>
                        </div>
                    </div>

                    {/* Middle: Main Form */}
                    <div className="my-auto py-6">
                        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                            Sign up with Email, Google Or Github
                        </span>
                        <h1 className="mt-1 text-3xl font-bold tracking-tight">
                            Sign In<span className="text-[#2086fe]">.</span>
                        </h1>
                        <p className="mt-2 text-xs text-gray-400">
                            Already have an account?{" "}
                            <Link href="/sign-in" className="text-[#2086fe] font-medium hover:underline">
                                Sign In
                            </Link>
                        </p>
                        <form onSubmit={handleSignUp} className="mt-8 space-y-4">
                            {/* Name Field */}
                            <div className="relative rounded-xl bg-[#2c313d] p-2.5 transition-all focus-within:ring-2 focus-within:ring-[#2086fe]/50">
                                <label htmlFor="name" className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="John Doe"
                                    disabled={loading}
                                    className="w-full bg-transparent pt-0.5 text-sm font-medium outline-none placeholder:text-gray-600"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="relative rounded-xl bg-[#2c313d] p-2.5 transition-all focus-within:ring-2 focus-within:ring-[#2086fe]/50">
                                <label htmlFor="email" className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="johndoe@mail.com"
                                    disabled={loading}
                                    className="w-full bg-transparent pt-0.5 text-sm font-medium outline-none placeholder:text-gray-600"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="relative rounded-xl border border-[#2086fe] bg-[#2c313d] p-2.5 shadow-[0_0_15px_rgba(32,134,254,0.15)] transition-all">
                                <label htmlFor="password" className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="********"
                                    disabled={loading}
                                    className="w-full bg-transparent pt-0.5 text-sm font-medium tracking-widest outline-none placeholder:text-gray-600"
                                />
                            </div>

                            {error && <p className="text-xs text-red-400">{error}</p>}

                            {/* Separation Text */}
                            <div className="text-center text-[10px] uppercase tracking-wider text-gray-500 py-1">
                                Or continue with social providers
                            </div>

                            {/* Action Buttons arranged like the image grid layout */}
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    variant="outline"
                                    onClick={handleGithubSignIn}
                                    disabled={loading}
                                    className="flex items-center justify-center gap-2 rounded-full bg-[#3d4354] border-none py-3 text-xs font-semibold text-gray-200 transition-colors hover:bg-[#484f63]"
                                >
                                    <FaGithub className="size-4"/>
                                    Github
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleGithubSignIn}
                                    disabled={loading}
                                    className="flex items-center justify-center gap-2 rounded-full bg-[#3d4354] border-none py-3 text-xs font-semibold text-gray-200 transition-colors hover:bg-[#484f63]"
                                >
                                    <FaGoogle className="size-4"/>
                                    Google
                                </Button>
                            </div>
                            {/* Main Form Submit Button */}
                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-full bg-[#2086fe] py-3 text-xs font-semibold text-white shadow-lg shadow-[#2086fe]/20 transition-all hover:bg-[#1a73df] disabled:opacity-50"
                                >
                                    {loading ? "Signing in..." : "Sign in"}
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className="flex gap-4 text-xs text-gray-500"></div>
                </div>

                {/* Right Side: Visual Graphic Accent */}
                <div className="relative hidden w-5/12 bg-cover bg-center md:block" style={{ backgroundImage: `url('https://unsplash.com')` }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#232732] via-[#232732]/40 to-transparent"></div>

                    <svg className="absolute inset-0 h-full w-full stroke-gray-600/30 fill-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 0,0 Q 35,50 0,100" strokeWidth="0.5" strokeDasharray="1,1" />
                    </svg>

                    <div className="absolute bottom-10 right-10 flex items-center justify-center text-white opacity-80">
                        <span className="text-xl font-black tracking-tighter text-right">.EPr</span>
                    </div>
                </div>

            </div>
        </div>

    )
}