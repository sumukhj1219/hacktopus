import Navbar from '@/components/globalComponents/navbar'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div 
            className="min-h-screen"
            style={{
                background: `linear-gradient(to bottom, 
                    #171717 0%, #171717 4%,  /* Blue fades out */
                    #171717 5%, #1F4D2E 15%, /* Soft transition from Blue to Green */
                    #1F4D2E 16%, #171717 20%, /* Green smoothly blends into Neutral */
                    #171717 21%, #0A0A0A 100% /* Neutral transitions to Neutral-950 */
                )`
            }}
        >
            <Navbar />
            <div className="max-w-6xl flex items-center justify-start mx-auto">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout
