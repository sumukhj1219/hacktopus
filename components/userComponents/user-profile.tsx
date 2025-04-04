"use client";
import React, { useState } from 'react';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { FiInstagram, FiLinkedin, FiTwitter, FiYoutube} from 'react-icons/fi';

const UserProfile = () => {
  const [firstName, setFirstName] = useState('Sumukh');
  const [lastName, setLastName] = useState('Joshi');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('/images/default-avatar.png');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [youtube, setYoutube] = useState('');
  const [tiktok, setTiktok] = useState('');

  const handleSave = () => {
    console.log('Saving profile:', {
      firstName,
      lastName,
      username,
      bio,
      profilePicture,
      instagram,
      twitter,
      youtube,
      tiktok,
    });
  };

  function setLinkedin(value: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className=" min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Profile</h1>
          <p className="text-sm text-neutral-500">
            Choose how you are displayed as a host or guest.
          </p>
        </div>
        <Separator className="bg-neutral-800" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-neutral-300">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-neutral-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-neutral-300">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-neutral-800 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-neutral-300">
                Username
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                  @
                </div>
                <Input
                  id="username"
                  className="pl-8 bg-neutral-800 text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
          <Label className="text-neutral-300">Social Links</Label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center rounded-md overflow-hidden bg-neutral-800">
              <div className="px-3 py-2 bg-neutral-700">
                <FiInstagram className="h-5 w-5 text-neutral-400" />
              </div>
              <span className="px-3 py-2 text-neutral-400">instagram.com/</span>
              <Input
                type="text"
                placeholder="username"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="flex-grow bg-transparent border-none text-white focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
            <div className="flex items-center rounded-md overflow-hidden bg-neutral-800">
              <div className="px-3 py-2 bg-neutral-700">
                <FiYoutube className="h-5 w-5 text-neutral-400" />
              </div>
              <span className="px-3 py-2 text-neutral-400">youtube.com/@</span>
              <Input
                type="text"
                placeholder="username"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                className="flex-grow bg-transparent border-none text-white focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
            <div className="flex items-center rounded-md overflow-hidden bg-neutral-800">
              <div className="px-3 py-2 bg-neutral-700">
                <FiLinkedin className="h-5 w-5 text-neutral-400" />
              </div>
              <span className="px-3 py-2 text-neutral-400">linkedin.com</span>
              <span className="px-1 py-2 text-neutral-400">/in/</span>
              <Input
                type="text"
                placeholder="handle"
                // value={linkedin} // You'll need to add a state for LinkedIn
                onChange={(e) => setLinkedin(e.target.value)} // And its setter
                className="flex-grow bg-transparent border-none text-white focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
            {/* Add other social links in the same format */}
          </div>
        </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-neutral-300">
                Bio
              </Label>
              <Input
                id="bio"
                placeholder="Share a little about your background and interests."
                className="h-24 resize-none bg-neutral-800 text-white"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-neutral-300">Profile Picture</Label>
              <div className="mt-2 flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profilePicture} alt={`${firstName} ${lastName}`} />
                  <AvatarFallback>{`${firstName?.charAt(0)}${lastName?.charAt(0)}`}</AvatarFallback>
                </Avatar>
                <Button size="sm" className="bg-neutral-800 text-white hover:bg-neutral-700">
                  Upload New
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" onClick={handleSave} className="bg-primary text-white hover:bg-primary-foreground">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;