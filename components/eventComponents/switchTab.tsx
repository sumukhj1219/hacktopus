import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateEvent from './create-event'
import CreateHackathon from '../hackathonComponents/create-hackathon'

const SwitchTab = () => {
  return (
    <div>
      <Tabs defaultValue="event" >
        <TabsList className='bg-neutral-700'>
          <TabsTrigger value="event" className='text-secondary'>Event</TabsTrigger>
          <TabsTrigger value="hackathon" className='text-secondary'>Hackathon</TabsTrigger>
        </TabsList>
        <TabsContent value="event" >
          <CreateEvent />
        </TabsContent>
        <TabsContent value="hackathon" >
          <CreateHackathon />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SwitchTab
