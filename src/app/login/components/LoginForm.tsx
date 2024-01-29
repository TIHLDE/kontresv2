"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginUser } from "../actions"
import { Button } from "@/components/ui/button"

type LoginFormSubmitEventType = z.infer<typeof formSchema>

const formSchema = z.object({
    user_id: z.string(),
    password: z.string(),
})

export function LoginForm({ redirect }: { redirect: string }){
    const form = useForm<LoginFormSubmitEventType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            user_id: "",
            password: "",
        }
    })

    const handleSubmit = async (data: LoginFormSubmitEventType) => {
        console.log('submit')

        await loginUser(data.user_id, data.password, redirect)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField control={form.control} name="user_id" render={({ field}) => (
                    <FormItem>
                        <FormLabel>Brukernavn</FormLabel>
                            <FormControl>
                            <Input placeholder="brukernavn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field}) => (
                    <FormItem>
                        <FormLabel>Passord</FormLabel>
                        <FormControl>
                        <Input placeholder="passord" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button className="w-full" type="submit">Login</Button>
            </form>
        </Form>
    )
}