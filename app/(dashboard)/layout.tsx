import Navbar from '@/components/globalComponents/navbar'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div 
            className="min-h-screen"
            style={{
                background: `linear-gradient(to bottom, 
                    #171717 0%, #171717 1%,  
                    #171717 1%, #1F4D2E 9%,  
                    #1F4D2E 10%, #171717 20%,  
                    #0a0a0a 100% /* Smooth transition to Neutral-950 */
                )`
            }}
        >
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout
