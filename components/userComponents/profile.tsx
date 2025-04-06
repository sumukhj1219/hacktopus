"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const Profile = () => {
  const { user } = useUser();

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="p-2 rounded-full hover:bg-neutral-950"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
              <AvatarFallback>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 font-bold bg-neutral-900 border border-neutral-800 text-secondary focus:outline-none">
          <div className="p-2">
            <div className="flex items-center justify-start gap-2 rounded-md p-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                <AvatarFallback>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm">
                <p className="font-semibold">{user?.fullName || "Guest"}</p>
                <p className="text-muted-foreground">{user?.emailAddresses?.[0]?.emailAddress || "No Email"}</p>
              </div>
            </div>
          </div>
          <DropdownMenuSeparator className="bg-neutral-800" />
          <DropdownMenuItem className="hover:bg-neutral-950 focus:bg-neutral-950">
            <Link href="/profile" className="w-full block text-secondary">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-neutral-950 focus:bg-neutral-950">
            <Link href="/my-events" className="w-full block text-secondary">
              My Events
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-neutral-800" />
          <DropdownMenuItem className="hover:bg-neutral-950 focus:bg-neutral-950">
            <button onClick={() => console.log("Sign Out")} className="w-full text-left text-secondary">
              Sign Out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;