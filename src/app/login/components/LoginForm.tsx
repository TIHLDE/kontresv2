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
        await loginUser(data.user_id, data.password, redirect).catch((err) => {
            console.error(err)
            form.setError("root", {
                type: "server",
                message: "Feil brukernavn eller passord"
            })
        })
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
                        </FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field}) => (
                    <FormItem>
                        <FormLabel>Passord</FormLabel>
                        <FormControl>
                        <Input placeholder="passord" type="password" {...field} />
                        </FormControl>
                    </FormItem>
                )} />
                {form.formState.errors.root && <FormMessage className="my-2">{form.formState.errors.root.message}</FormMessage>}
                <Button className="w-full" type="submit">Login</Button>
            </form>
        </Form>
    )
}