"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import axios from "axios";
import { UserHackathons } from "@prisma/client";
import Link from "next/link";

const OurHackathonsPage = () => {
  const [hackathons, setHackathons] = useState<UserHackathons[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.get("/api/our-hackathons");
        const fetchedData = res.data?.result || []; 
        setHackathons(fetchedData);
        console.log(res)
      } catch (error) {
        console.error("Error fetching hackathons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Our Hackathons</h1>
      {loading ? (
        <p>Loading hackathons...</p>
      ) : hackathons?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathons.map((hackathon) => (
            <Card key={hackathon.id} className="shadow-lg hover:shadow-xl transition duration-200">
              <Image
                src={hackathon.imageUrl || "/placeholder.jpg"} 
                alt={hackathon.hackathon_name}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{hackathon.hackathon_name}</CardTitle>
                <CardDescription>{hackathon.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline">{hackathon.theme}</Badge>
                  <Badge>{hackathon.location}</Badge>
                </div>
                <a
                  href={hackathon.hackathon_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit Website
                </a>
              </CardContent>
              <Link className="bg-primary p-4 w-full flex items-center justify-center mx-auto text-secondaryBlack" href={`/join/${hackathon.id}`}>
                    Join
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <p>No hackathons found</p>
      )}
    </div>
  );
};

export default OurHackathonsPage;
