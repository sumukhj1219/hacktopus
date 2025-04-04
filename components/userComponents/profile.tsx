"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"

const Profile = () => {
    const {user} = useUser()
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src={user?.imageUrl} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-neutral-950 border  border-neutral-900 text-secondary">
                    <DropdownMenuItem>
                        <Link href="/profile">
                        Profile
                        </Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default Profile

