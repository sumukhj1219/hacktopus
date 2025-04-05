"use client";
import React, { useState } from 'react';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiYoutube,
  FiPhone,
  FiMail,
  FiGithub,
  FiGlobe,
  FiMapPin,
} from 'react-icons/fi';
import { Textarea } from '../ui/textarea';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

const UserProfile = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(user?.imageUrl || '/images/default-avatar.png');
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    twitter: '',
    youtube: '',
    linkedin: '',
    github: '',
    facebook: '',
    website: '',
  });
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState(user?.emailAddresses[0]?.emailAddress || '');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false)
  const handleSocialLinkChange = (name: keyof typeof socialLinks, value: string) => {
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async() => {
    setLoading(true)
    try {
      const response = await axios.post("/api/user/update-profile",{
        firstName,
      lastName,
      username,
      bio,
      profilePicture,
      socialLinks,
      mobileNumber,
      email,
      location,
      })
      if(response.status === 200){
        console.log('updated')
      }
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="mt-36 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
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
                  className="bg-neutral-800 text-white border border-neutral-900 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 text-lg font-medium"
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
                  className="bg-neutral-800 text-white border border-neutral-900 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 text-lg font-medium"
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
                  className="pl-8 bg-neutral-800 text-white border border-neutral-900 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 text-lg font-medium"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobileNumber" className="text-neutral-300">
                Mobile Number
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                  <FiPhone className="h-5 w-5" />
                </div>
                <Input
                  id="mobileNumber"
                  type="tel"
                  className="pl-8 bg-neutral-800 text-white border border-neutral-900 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 text-lg font-medium"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-300">
                Email
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                  <FiMail className="h-5 w-5" />
                </div>
                <Input
                  id="email"
                  type="email"
                  className="pl-8 bg-neutral-800 text-white border border-neutral-900 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 text-lg font-medium"
                  value={user?.emailAddresses[0].emailAddress}
                  readOnly 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-neutral-300">
                Location
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                  <FiMapPin className="h-5 w-5" />
                </div>
                <Input
                  id="location"
                  type="text"
                  placeholder="City/State/Country"
                  className="pl-8 bg-neutral-800 text-white border border-neutral-900 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 text-lg font-medium"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-neutral-300">Social Links</Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center rounded-md overflow-hidden bg-neutral-800 border border-neutral-900">
                  <div className="px-3 py-2 bg-neutral-700 border-r border-neutral-900">
                    <FiInstagram className="h-5 w-5 text-neutral-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Instagram Username"
                    value={socialLinks.instagram}
                    onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                    className="flex-grow bg-transparent border-none text-white focus-visible:outline-none focus-visible:ring-0 text-lg font-medium"
                  />
                </div>
                <div className="flex items-center rounded-md overflow-hidden bg-neutral-800 border border-neutral-900">
                  <div className="px-3 py-2 bg-neutral-700 border-r border-neutral-900">
                    <FiTwitter className="h-5 w-5 text-neutral-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Twitter Handle"
                    value={socialLinks.twitter}
                    onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                    className="flex-grow bg-transparent border-none text-white focus-visible:outline-none focus-visible:ring-0 text-lg font-medium"
                  />
                </div>
                <div className="flex items-center rounded-md overflow-hidden bg-neutral-800 border border-neutral-900">
                  <div className="px-3 py-2 bg-neutral-700 border-r border-neutral-900">
                    <FiYoutube className="h-5 w-5 text-neutral-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="YouTube Channel/User"
                    value={socialLinks.youtube}
                    onChange={(e) => handleSocialLinkChange('youtube', e.target.value)}
                    className="flex-grow bg-transparent border-none text-white focus-visible:outline-none focus-visible:ring-0 text-lg font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-neutral-300">
                Bio
              </Label>
              <Textarea
                id="bio"
                placeholder="Share a little about your background and interests."
                className="h-24 resize-none bg-neutral-800 text-white border border-neutral-900 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 text-lg font-medium"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="mt-2 flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.imageUrl} alt={`${firstName} ${lastName}`} />
                  <AvatarFallback>{`${firstName?.charAt(0)}${lastName?.charAt(0)}`}</AvatarFallback>
                </Avatar>
                {/* <Button size="sm" className="bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-900">
                  Upload New
                </Button> */}
              </div>
            </div>

            <div className="space-y-2 mt-67">
              <Label className="text-neutral-300">More Social Links</Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center rounded-md overflow-hidden bg-neutral-800 border border-neutral-900">
                  <div className="px-3 py-2 bg-neutral-700 border-r border-neutral-900">
                    <FiLinkedin className="h-5 w-5 text-neutral-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="LinkedIn Profile URL"
                    value={socialLinks.linkedin}
                    onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                    className="flex-grow bg-transparent border-none text-white focus-visible:outline-none focus-visible:ring-0 text-lg font-medium"
                  />
                </div>
                <div className="flex items-center rounded-md overflow-hidden bg-neutral-800 border border-neutral-900">
                  <div className="px-3 py-2 bg-neutral-700 border-r border-neutral-900">
                    <FiGithub className="h-5 w-5 text-neutral-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="GitHub Username/URL"
                    value={socialLinks.github}
                    onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                    className="flex-grow bg-transparent border-none text-white focus-visible:outline-none focus-visible:ring-0 text-lg font-medium"
                  />
                </div>
                
                <div className="flex items-center rounded-md overflow-hidden bg-neutral-800 border border-neutral-900">
                  <div className="px-3 py-2 bg-neutral-700 border-r border-neutral-900">
                    <FiGlobe className="h-5 w-5 text-neutral-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Website URL"
                    value={socialLinks.website}
                    onChange={(e) => handleSocialLinkChange('website', e.target.value)}
                    className="flex-grow bg-transparent border-none text-white focus-visible:outline-none focus-visible:ring-0 text-lg font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-x-3">
          <Button type="submit" onClick={handleSave} >
            Save Changes
          </Button>

          <Button variant={'destructive'} onClick={() => console.log('Delete user')} className="border border-destructive">
            Delete user
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;