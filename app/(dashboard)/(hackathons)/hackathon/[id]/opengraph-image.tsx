import { ImageResponse } from 'next/og';
import { prisma } from '@/lib/db';

export const runtime = 'edge';

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { id: string } }) {
    const hackathon = await prisma.hackathons.findUnique({
        where: { id: params.id },
    });

    if (!hackathon) {
        return new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        fontSize: 48,
                        background: 'linear-gradient(to bottom, #f97316, #c2410c)',
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        padding: 20,
                    }}
                >
                    <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 20 }}>
                        Hackathon Finder
                    </div>
                    <div>Hackathon not found</div>
                </div>
            ),
            size
        );
    }

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    fontSize: 48,
                    background: 'linear-gradient(to bottom, #f97316, #c2410c)',
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    padding: 40,
                }}
            >
                <div style={{
                    fontSize: 36,
                    opacity: 0.9,
                    marginBottom: 20,
                    background: 'rgba(0,0,0,0.2)',
                    padding: '8px 16px',
                    borderRadius: 8
                }}>
                    {hackathon.platform.toUpperCase()}
                </div>
                <div style={{
                    fontSize: 72,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 20
                }}>
                    {hackathon.hackathon_name}
                </div>
                {hackathon.theme && (
                    <div style={{
                        fontSize: 36,
                        opacity: 0.9,
                        textAlign: 'center',
                        maxWidth: '80%'
                    }}>
                        {hackathon.theme}
                    </div>
                )}
            </div>
        ),
        size
    );
} 