import { Bell, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-2 lg:gap-4">
        <div className="hidden md:flex">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 rounded-md bg-background pl-8 md:w-80 lg:w-96"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="/avatar.png" alt="User" />
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}