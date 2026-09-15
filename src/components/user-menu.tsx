import {User} from "better-auth";
import {useRouter} from "next/navigation";
import {signOut} from "@/lib/auth-client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {BiChevronDown, BiUser} from "react-icons/bi";
import {FiSettings} from "react-icons/fi";
import {GrLogout} from "react-icons/gr";

interface UserMenuProps {
    id: string;
    name: string;
    email: string;
    image?: string | null | undefined;
}

export function UserMenu({user}: {user: UserMenuProps}){
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    }

    const initials = user.name
        ? user.name.trim().split(/\s+/).map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : (user.email?.[0]?.toUpperCase() ?? "U");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
               <Button variant={"ghost"} className="h-9 gap-2 px-2 hover:bg-muted/80">
                   <Avatar className="size-7 ring-1 ring-border">
                       <AvatarImage
                           src={user.image ?? undefined}
                           alt={user.name ?? "user"}
                       />
                       <AvatarFallback className="text-sm font-medium bg-primary/10 text-primary">
                           {initials}
                       </AvatarFallback>
                   </Avatar>
                   <span className="hidden sm:inline-block text-sm font-medium max-w-25 truncate">
                       {user.name?.split(" ")[0] ?? "User"}
                   </span>
                   <BiChevronDown className="size-3.5 text-muted-foreground"/>
               </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
               <div className="px-3 py-3">
                   <div className="flex items-center gap-3">
                       <Avatar className="size-10 ring-1 ring-border">
                           <AvatarImage
                               src={user.image ?? undefined}
                               alt={user.name ?? "user"}
                           />
                           <AvatarFallback className="text-sm font-medium bg-primary/10 text-primary">
                               {initials}
                           </AvatarFallback>
                       </Avatar>
                       <div className="flex flex-col min-w-0">
                           <span className="text-sm font-medium truncate">
                               {user.name ?? "User"}
                           </span>
                           <span className="text-xs text-muted-foreground truncate">
                               {user.email ?? ""}
                           </span>
                       </div>
                   </div>
               </div>
                <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 py-2 cursor-pointer">
                        <BiUser className="size-4" />
                            Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 py-2 cursor-pointer" disabled>
                        <FiSettings/>
                        Settings
                    </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                onClick={handleSignOut}
                className="gap-2 py-2 cursor-pointer text-destructive focus:bg-destructive/10">
                    <GrLogout className="size-4"/>
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}