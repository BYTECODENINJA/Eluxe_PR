"use client"
import {LuFolderGit2} from "react-icons/lu";
import {GitPullRequestIcon} from "@phosphor-icons/react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";

interface User{
    id: string,
    name: string,
    email: string,
    image?: string | null | undefined
}

interface HeaderProps{
    user: User
}

const navItems = [
    {
        href: "/repos",
        label: "Repositories",
        icon: LuFolderGit2,
    },
    {
        href: "/reviews",
        label: "Reviews",
        icon: GitPullRequestIcon,
    }
];

export function Header({user}: HeaderProps){
    const pathName = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/6">
            <div className="container mx-auto flex h-14 items-center justify-between px-4">
                <div className="flex items-center gap-8">
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => {
                            const isActive = pathName == item.href || pathName.startsWith(`${item.href}/`);
                            const Icon = item.icon;

                            return (
                               <Link
                                   key={item.href}
                                   href={item.href}
                                   className={cn("flex items-center gap-2 px-1.5 rounded-md text-sm font-medium transition-colors",
                                   isActive ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}
                               >
                                   <Icon className="size-4"/>
                                       {item.label}
                               </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </header>
    )
}