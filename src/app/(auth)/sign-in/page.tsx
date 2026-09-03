"use client"
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {signIn} from "@/lib/auth-client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {FaGithub, FaGoogle} from "react-icons/fa";
import {Separator} from "@base-ui/react";
import {handleEntrypoints} from "next/dist/server/dev/turbopack-utils";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await signIn.email({
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
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Sign In</CardTitle>
                    <CardDescription>
                        Sign in with Email, Google Or Github
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex flex-row gap-4">
                       <Button
                           variant="outline"
                           onClick={handleGithubSignIn}
                           disabled={loading}>
                           <FaGithub className="mr-2 size-4"/>
                           Sign in with Github
                       </Button>
                       <Button
                           variant="outline"
                           onClick={handleGithubSignIn}
                           disabled={loading}>
                           <FaGoogle className="mr-2 size-4"/>
                           Sign in with Google
                       </Button>
                   </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex justify-center">
                            <Separator className="w-full"/>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                                Or continue with email
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium leading-none">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                    </form>

                </CardContent>
            </Card>
        </div>
    )
}