import { GridBackgroundDemo } from '@/components/globalComponents/grids'
import Navbar from '@/components/globalComponents/navbar'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
 <div 
            className="min-h-screen"
           
        >
            <Navbar />
            <GridBackgroundDemo>

            <div className="max-w-6xl mx-auto px-4 flex items-center justify-center">
                {children}
            </div>
        </GridBackgroundDemo>

        </div>
       
    )
}

export default DashboardLayout
