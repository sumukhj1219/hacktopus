import { Metadata, ResolvingMetadata } from 'next';
import { prisma } from '@/lib/db';

type Props = {
    params: { id: string };
    children: React.ReactNode;
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // Fetch hackathon data
    try {
        const hackathon = await prisma.hackathons.findUnique({
            where: { id: params.id },
        });

        if (!hackathon) {
            return {
                title: 'Hackathon Not Found',
                description: 'The requested hackathon could not be found.',
            };
        }

        // Generate description
        let description = hackathon.theme
            ? `Learn about ${hackathon.hackathon_name}, a hackathon focused on ${hackathon.theme}.`
            : `Details about ${hackathon.hackathon_name} hackathon. Join and showcase your skills!`;

        return {
            title: `${hackathon.hackathon_name} | Hackathon Finder`,
            description,
            openGraph: {
                title: `${hackathon.hackathon_name} | Hackathon Finder`,
                description,
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: hackathon.hackathon_name,
                description,
            },
        };
    } catch (error) {
        console.error("Error generating metadata:", error);
        return {
            title: 'Hackathon Details',
            description: 'View detailed information about this hackathon.',
        };
    }
}

export default function HackathonLayout({ children }: Props) {
    return children;
} 