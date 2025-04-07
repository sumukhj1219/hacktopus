import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function HackathonNotFound() {
    return (
        <div className="container mx-auto px-4 py-24">
            <div className="flex flex-col items-center justify-center text-center">
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-orange-600 mb-4">
                            Hackathon Not Found
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            The hackathon you're looking for doesn't exist or has been removed.
                        </p>
                        <Button asChild>
                            <Link href="/hackathons">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hackathons
                            </Link>
                        </Button>
                    </div>
            </div>
        </div>
    );
} 