"use client";
import React from 'react';
import { InputEvent } from '../ui/input-event';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormMessage,
} from "@/components/ui/form";
import { CalendarIcon, MapPinIcon, LinkIcon, UsersIcon, MailIcon, GlobeIcon, HashIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';
import ImageUpload from '@/utils/uploadImage';
import { hackathonSchema } from '@/schemas/hackathonSchema';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const CreateHackathon = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof hackathonSchema>>({
        resolver: zodResolver(hackathonSchema),
        defaultValues: {
            hackathon_name: "",
            hackathon_website: "",
            theme: "",
            imageUrl: "",
            location: "",
            description: "",
            contactInfo_1: "",
            contactInfo_2: "",
            contactEmail_1: "",
            contactEmail_2: "",
            start_date: "",
            prizePool:"",
            end_date: "",
            social: "",
            pincode: "",
            website_link: ""
        },
    });

    const { handleSubmit, control } = form;
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    async function onSubmit(values: z.infer<typeof hackathonSchema>) {
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/events/create-hackathon', values);
            if (response.status === 200) {
                toast.success("Hackathon created successfully!");
                router.push('/hackathons'); 
            } else {
                toast.error("Failed to create hackathon.");
            }
        } catch (error: any) {
            console.error("Error creating hackathon:", error);
            toast.error(error?.response?.data?.message || "Something went wrong while creating the hackathon.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <div className='w-full h-full rounded-xl'>
                <div className='text-6xl'>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 grid grid-cols-3 gap-x-4">
                            <div className='col-span-1'>
                                <div className='bg-amber-50 w-70 h-70 rounded-xl'>
                                    <FormField
                                        control={control}
                                        name="imageUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <ImageUpload value={field.value} onChange={field.onChange} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='col-span-2'>
                                <FormField
                                    control={control}
                                    name="hackathon_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <InputEvent
                                                placeholder='Hackathon Name'
                                                type='text'
                                                className='text-4xl mb-3 leading-normal pb-3 border-0 font-bold text-white'
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='grid grid-cols-2 gap-x-2 gap-y-4'>
                                    <FormField
                                        control={control}
                                        name="theme"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='relative'>
                                                    <HashIcon className='absolute left-3 top-3 h-4 w-4 text-secondary' />
                                                    <Input
                                                        placeholder='Theme'
                                                        type='text'
                                                        className='border-neutral-700 bg-neutral-900 w-60 text-secondary pl-8'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="start_date"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"default"}
                                                                className={cn(
                                                                    "w-[240px] pl-3 text-left font-normal border border-neutral-700",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(new Date(field.value), "PPP")
                                                                ) : (
                                                                    <span>Start Date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value ? new Date(field.value) : undefined}
                                                            onSelect={(date) => field.onChange(date?.toISOString())}
                                                            disabled={(date) => date < new Date()}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="end_date"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"default"}
                                                                className={cn(
                                                                    "w-[240px] pl-3 text-left font-normal border border-neutral-700",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(new Date(field.value), "PPP")
                                                                ) : (
                                                                    <span>End Date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value ? new Date(field.value) : undefined}
                                                            onSelect={(date) => field.onChange(date?.toISOString())}
                                                            disabled={(date) => date < new Date()}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='relative'>
                                                    <MapPinIcon className='absolute left-3 top-3 h-4 w-4 text-secondary' />
                                                    <Input
                                                        placeholder='Location'
                                                        type='text'
                                                        className='border-neutral-700 bg-neutral-900 w-60 text-secondary pl-8'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="pincode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='relative'>
                                                    <HashIcon className='absolute left-3 top-3 h-4 w-4 text-secondary' />
                                                    <Input
                                                        placeholder='Pincode'
                                                        type='text'
                                                        className='border-neutral-700 bg-neutral-900 w-60 text-secondary pl-8'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="hackathon_website"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='relative'>
                                                    <LinkIcon className='absolute left-3 top-3 h-4 w-4 text-secondary' />
                                                    <Input
                                                        placeholder='Hackathon Website'
                                                        type='text'
                                                        className='border-neutral-700 bg-neutral-900 w-60 pl-8'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="website_link"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='relative'>
                                                    <GlobeIcon className='absolute left-3 top-3 h-4 w-4 text-secondary' />
                                                    <Input
                                                        placeholder='Website Link (Optional)'
                                                        type='text'
                                                        className='border-neutral-700 bg-neutral-900 w-60 text-secondary pl-8'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="social"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='relative'>
                                                    <LinkIcon className='absolute left-3 top-3 h-4 w-4 text-secondary' />
                                                    <Input
                                                        placeholder='Social Link (Optional)'
                                                        type='text'
                                                        className='border-neutral-700 bg-neutral-900 w-60 text-secondary pl-8'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                        <FormField
                                        control={control}
                                        name="prizePool"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='relative'>
                                                    <LinkIcon className='absolute left-3 top-3 h-4 w-4 text-secondary' />
                                                    <Input
                                                        placeholder='Prize pool '
                                                        type='text'
                                                        className='border-neutral-700 bg-neutral-900 w-60 text-secondary pl-8'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name="contactInfo_1"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='relative'>
                                                    <UsersIcon className='absolute left-3 top-3 h-4 w-4 text-secondary' />
                                                    <Input
                                                        placeholder='Contact Number 1'
                                                        type='text'
                                                        className='border-neutral-700 bg-neutral-900 w-60 text-secondary pl-8'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="contactInfo_2"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='relative'>
                                                    <UsersIcon className='absolute left-3 top-3 h-4 w-4 text-secondary' />
                                                    <Input
                                                        placeholder='Contact Number 2'
                                                        type='text'
                                                        className='border-neutral-700 bg-neutral-900 w-60 text-secondary pl-8'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="contactEmail_1"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='relative'>
                                                    <MailIcon className='absolute left-3 top-3 h-4 w-4 text-secondary' />
                                                    <Input
                                                        placeholder='Contact Email 1'
                                                        type='text'
                                                        className='border-neutral-700 bg-neutral-900 w-60 text-secondary pl-8'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="contactEmail_2"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='relative'>
                                                    <MailIcon className='absolute left-3 top-3 h-4 w-4 text-secondary' />
                                                    <Input
                                                        placeholder='Contact Email 2 (Optional)'
                                                        type='text'
                                                        className='border-neutral-700 w-60 bg-neutral-900 text-secondary pl-8'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Textarea
                                                placeholder='Description in detail'
                                                className='border-neutral bg-neutral-900 border-neutral-700 mt-5 text-secondary'
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    variant={'secondary'}
                                    size={'lg'}
                                    className='w-full text-xl'
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Creating..." : "Create Hackathon"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default CreateHackathon;