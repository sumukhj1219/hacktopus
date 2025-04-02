"use server";

import { prisma } from "@/lib/db";
import Link from "next/link";
import React from "react";
import { LightbulbIcon, BookOpenIcon, ChevronRightIcon } from "lucide-react";

const SampleIdeaPage = async () => {
    const sampleIdeas = await prisma.sampleIdeas.findMany();

    if (!sampleIdeas || sampleIdeas.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
                <LightbulbIcon className="w-16 h-16 text-gray-300 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700">No Sample Ideas Yet</h2>
                <p className="mt-2 text-gray-500 max-w-md">
                    There are currently no sample ideas available. Check back later for inspiration.
                </p>
            </div>
        );
    }

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                    Explore Project Ideas
                </h1>
                <p className="max-w-2xl mx-auto text-gray-500">
                    Browse through our collection of sample project ideas to jumpstart your creativity
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleIdeas.map((idea) => (
                    <Link href={`/sample/${idea.id}`} key={idea.id} className="group">
                        <div className="h-full flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-100">
                            <div className="flex items-center p-6">
                                <div className="flex-shrink-0 mr-4">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                                        <BookOpenIcon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                    {idea.title}
                                </h2>
                            </div>
                            <div className="mt-auto flex items-center p-4 border-t border-gray-100">
                                <span className="text-sm font-medium text-blue-600">View details</span>
                                <ChevronRightIcon className="ml-1 h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SampleIdeaPage;