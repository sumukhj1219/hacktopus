"use client";
import React, { useEffect, useState } from 'react';
import { CalendarIcon, Trophy, Code, UsersIcon, Link } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import axios from 'axios';
import { Separator } from '../ui/separator';

interface Hackathon {
  id: string;
  hackathon_name: string;
  description: string;
  imageUrl: string;
  start_date: string;
  end_date: string;
  pricePool?: string;
  projectsCount?: number;
  participantsCount?: number;
}

const HackathonCard = ({ hackathon }: { hackathon: Hackathon }) => {
  const startDate = format(new Date(hackathon.start_date), 'M/d/yyyy');
  const endDate = format(new Date(hackathon.end_date), 'M/d/yyyy');

  return (
    <div>
      <h1 className='text-secondary font-bold mt-10 text-3xl'>Hackathons</h1>
      <Separator className='bg-neutral-700 mt-2' />
      <Link href={`/hackathons/${hackathon.id}`}>
      <div className="bg-neutral-900 rounded-lg mt-10 shadow-md p-6 flex items-center justify-between">

        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 rounded-md overflow-hidden">
            <Image
              src={hackathon.imageUrl || '/images/placeholder_hackathon.png'}
              alt={hackathon.hackathon_name}
              layout="fill"
              objectFit="cover"
              onError={(e) => {
                console.error("Error loading image:", e);
                (e.target as HTMLImageElement).src = '/images/placeholder_hackathon.png';
              }}
            />
          </div>
          <div >
            <h3 className="text-xl font-semibold text-secondary">{hackathon.hackathon_name}</h3>
            <p className="text-secondary text-sm mb-1">{hackathon.description}</p>
            <p className="text-secondary text-xs">
              <CalendarIcon className="inline-block w-4 h-4 mr-1" />
              {startDate} - {endDate}
            </p>
          </div>
        </div>
        <div className="text-right">
          {hackathon.pricePool !== "" && (
            <p className="text-secondary font-medium">
              <Trophy className="inline-block w-4 h-4 mr-1" />
              ${hackathon.pricePool}
            </p>
          )}
          {hackathon.projectsCount !== undefined && (
            <p className="text-gray-700 text-sm">
              <Code className="inline-block w-4 h-4 mr-1" />
              {hackathon.projectsCount} projects
            </p>
          )}
          {hackathon.participantsCount !== undefined && (
            <p className="text-gray-700 text-sm">
              <UsersIcon className="inline-block w-4 h-4 mr-1" />
              {hackathon.participantsCount} participants
            </p>
          )}
          {/* {(hackathon.prizePool === undefined && hackathon.projectsCount === undefined && hackathon.participantsCount === undefined) && (
            <p className="text-gray-700 text-sm">Details coming soon</p>
          )} */}
        </div>
      </div>
      </Link>
      
    </div>

  );
};

const DisplayHackathons = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.get('/api/events/get-hackathons');
        if (response.data && response.data.result) {
          setHackathons(response.data.result);
        } else {
          setError('Failed to load hackathons: Invalid data format');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load hackathons');
        console.error("Error fetching hackathons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  if (loading) {
    return <div>Loading hackathons...</div>;
  }

  if (error) {
    return <div>Error loading hackathons: {error}</div>;
  }

  return (
    <div className="space-y-4">
      {hackathons.map((hackathon) => (
        <HackathonCard key={hackathon.id} hackathon={hackathon} />
      ))}
    </div>
  );
};

export default DisplayHackathons;