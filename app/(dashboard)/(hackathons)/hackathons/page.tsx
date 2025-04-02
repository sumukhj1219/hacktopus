"use client"
import BrowseEventsByTheme from "@/components/hackathonComponents/browseEventsByTheme";
import Hackathons from "@/components/hackathonComponents/hackathons";
import dynamic from "next/dynamic";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// const MapComponent = dynamic(() => import("@/components/hackathonComponents/map"), { ssr: false });
// const Hackathons = dynamic(() => import("@/components/hackathonComponents/hackathons"), { ssr: false });

export default function Page() {
  return (
    <div className="flex items-center justify-center  max-w-6xl">
      <div className="py-10 mt-10">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-start text-secondary">
          Discover Hackathons
        </h1>
        <p className="flex items-center justify-start text-secondary py-2">
          Explore popular events near you, browse by category, or check out some of the great community calendars.
        </p>
        <Hackathons />
        <BrowseEventsByTheme />
        {/* <Tabs defaultValue="list" className="max-w-6xl mx-auto px-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="mt-6">
          <Hackathons />
        </TabsContent>
        <TabsContent value="map" className="mt-6">
          <MapComponent />
        </TabsContent>
      </Tabs> */}
      </div>
    </div>

  );
}
