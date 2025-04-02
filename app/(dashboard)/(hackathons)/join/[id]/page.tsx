import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CreateTeam from '@/components/hackathonComponents/createTeam';
import JoinHackathonPage from '@/components/hackathonComponents/joinHackathon';

const HackathonPage = () => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <Tabs defaultValue="join" className="w-full">
        <TabsList className="flex justify-center">
          <TabsTrigger value="join">Join Hackathon</TabsTrigger>
          <TabsTrigger value="create">Create Team</TabsTrigger>
        </TabsList>
        <TabsContent value="join">
          <JoinHackathonPage />
        </TabsContent>
        <TabsContent value="create">
          <CreateTeam />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HackathonPage;
