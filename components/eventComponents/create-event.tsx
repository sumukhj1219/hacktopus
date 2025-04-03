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
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { CalendarIcon, LinkIcon, MapPinIcon, UsersIcon, GlobeIcon, FileTextIcon } from 'lucide-react'
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
            event_link: "",
            event_name: "",
            imageUrl: "",
            website_link: "",
            social: "",
            participants: "",
            start_date: "",
            end_date: "",
            pincode: "",
            location: "",
        },
    })

    function onSubmit(values: z.infer<typeof EventSchema>) {
        console.log("Form submitted", values)
    }

    return (
        <div className='w-full h-full rounded-xl'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 grid grid-cols-3 gap-x-4">
                    <div className='col-span-1 rounded-xl p-4'>
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
                    <div className='col-span-2'>
                        <FormField
                            control={form.control}
                            name="event_name"
                            render={({ field }) => (
                                <FormItem>
                                    <InputEvent
                                        placeholder='Event name'
                                        type='text'
                                        className='text-4xl mb-3 leading-normal pb-3 border-0 font-bold text-white' // Add padding-bottom
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='grid grid-cols-2 gap-x-2 gap-y-4'>
                            {["start_date", "end_date"].map((dateField, index) => (
                                <FormField
                                    key={dateField}
                                    control={form.control}
                                    name={dateField}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="default"
                                                            className={cn("w-[240px] pl-3 text-left font-normal border border-neutral-700", !field.value && "text-muted-foreground")}
                                                        >
                                                            {field.value ? format(new Date(field.value), "PPP") : <span>{index === 0 ? "Start date" : "End date"}</span>}
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
                            ))}
                            {["location", "pincode", "event_link", "website_link", "social", "participants"].map((fieldName, index) => {
                                const icons = [MapPinIcon, MapPinIcon, LinkIcon, GlobeIcon, LinkIcon, UsersIcon]
                                const Icon = icons[index]
                                return (
                                    <FormField
                                        key={fieldName}
                                        control={form.control}
                                        name={fieldName}
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="relative">
                                                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                                                    <Input
                                                        placeholder={fieldName.replace("_", " ").toUpperCase()}
                                                        type='text'
                                                        className='border-neutral-700 w-60 pl-10 text-secondary'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )
                            })}
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="relative">
                                        <FileTextIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                                        <Textarea
                                            placeholder='Description in detail'
                                            className='border-neutral-700 mt-5 text-secondary pl-10'
                                            {...field}
                                        />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button variant={'secondary'} size={'lg'} className='w-full text-xl mt-4' type="submit">Create Event</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CreateEvent
