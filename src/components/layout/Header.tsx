import { useAuth } from "@/hooks/useAuth";
import localApi from "@/integrations/local-api/client";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { LogOut, User } from "lucide-react";

const Header = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    
    const { data: profile } = useQuery({
        queryKey: ['profile', user?.id, 'header'],
        queryFn: async () => {
            if (!user) return null;
            try {
                const data = await localApi.getProfile();
                return data;
            } catch (error) {
                console.error("Error fetching profile for header", error);
                return null;
            }
        },
        enabled: !!user,
    });

    const handleLogout = async () => {
        signOut();
        navigate('/');
    };
    
    const getInitials = (name?: string | null) => {
        if (!name) return 'U';
        const names = name.split(' ').filter(Boolean);
        if (names.length > 1) {
            return (names[0][0] + names[names.length - 1][0]).toUpperCase();
        }
        if (names.length === 1 && names[0].length > 1) {
             return names[0].substring(0, 2).toUpperCase();
        }
        return name?.[0]?.toUpperCase() || 'U';
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link to="/explore" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">Homey</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link to="/explore" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Explore
                        </Link>
                        <Link to="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Dashboard
                        </Link>
                    </nav>
                </div>
                
                <div className="flex flex-1 items-center justify-end space-x-4">
                    {user ? (
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src="" alt={profile?.full_name || user.email || ""} />
                                        <AvatarFallback>{getInitials(profile?.full_name || user.email)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{profile?.full_name || 'User'}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to="/profile"><User className="mr-2 h-4 w-4" />Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button asChild>
                            <Link to="/auth">Sign In</Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
