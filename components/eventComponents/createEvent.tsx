"use client"
import React from 'react'
import { InputEvent } from '../ui/input-event'
import { Input } from '../ui/input'
import { EventSchema } from '@/schemas/eventSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Textarea } from '../ui/textarea'
import ImageUpload from '@/utils/uploadImage'


const CreateEvent = () => {
    const form = useForm<z.infer<typeof EventSchema>>({
        resolver: zodResolver(EventSchema),
        defaultValues: {
            hackathon_link: "",
            hackathon_name: "",
            imageUrl: "",
            website_link: "",
            social: "",
            theme: "",
            participants: "",
            start_date: "",
            end_date:"",
            pincode: "",
            location: "",
        },
    })

    function onSubmit(values: z.infer<typeof EventSchema>) {
        console.log(values)
    }
    return (
        <div>
            <div className='w-full h-full rounded-xl'>
                <div className='text-6xl'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 grid grid-cols-3 gap-x-4">
                            <div className='col-span-1'>
                                <div className='bg-amber-50 w-70 h-70 rounded-xl'>
                                    <FormField
                                        control={form.control}
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
                                    control={form.control}
                                    name="hackathon_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <InputEvent
                                                placeholder='Event name'
                                                type='text'
                                                className='text-6xl mb-5 text-secondary border-0 font-bold'
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='grid grid-cols-2 gap-x-2 gap-y-4'>
                                    <FormField
                                        control={form.control}
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
                                                                    format(new Date(field.value), "PPP") // Ensure Date object
                                                                ) : (
                                                                    <span>End date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value ? new Date(field.value) : undefined} // Ensure Date object
                                                            onSelect={(date) => field.onChange(date?.toISOString())} // Convert Date to string
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
                                        control={form.control}
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
                                                                    format(new Date(field.value), "PPP") // Ensure Date object
                                                                ) : (
                                                                    <span>End date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value ? new Date(field.value) : undefined} // Ensure Date object
                                                            onSelect={(date) => field.onChange(date?.toISOString())} // Convert Date to string
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
                                        control={form.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel className='text-secondary'>Location</FormLabel> */}
                                                <Input
                                                    placeholder='Enter location'
                                                    type='text'
                                                    className='border-neutral-700 w-60'

                                                    {...field}
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="pincode"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel className='text-secondary'>Pincode</FormLabel> */}
                                                <Input
                                                    placeholder='Pincode'
                                                    type='text'
                                                    className='border-neutral-700 w-60'
                                                    {...field}
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="hackathon_link"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel className='text-secondary'>Pincode</FormLabel> */}
                                                <Input
                                                    placeholder='Event link'
                                                    type='text'
                                                    className='border-neutral-700 w-60'
                                                    {...field}
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="website_link"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel className='text-secondary'>Pincode</FormLabel> */}
                                                <Input
                                                    placeholder='Website link'
                                                    type='text'
                                                    className='border-neutral-700 w-60'
                                                    {...field}
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="social"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel className='text-secondary'>Pincode</FormLabel> */}
                                                <Input
                                                    placeholder='Social (any one)'
                                                    type='text'
                                                    className='border-neutral-700 w-60'
                                                    {...field}
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="participants"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel className='text-secondary'>Pincode</FormLabel> */}
                                                <Input
                                                    placeholder='Max participants'
                                                    type='text'
                                                    className='border-neutral-700 w-60'
                                                    {...field}
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                </div>
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            {/* <FormLabel className='text-secondary'>Pincode</FormLabel> */}
                                            <Textarea
                                                placeholder='Description in detail'
                                                className='border-neutral-70 border-neutral-700 mt-5'
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            <Button variant={'secondary'} size={'lg'} className='w-full text-xl' type="submit">Create Event</Button>

                                
                            </div>
                        </form>
                    </Form>

                </div>
            </div>
        </div>
    )
}

export default CreateEvent
