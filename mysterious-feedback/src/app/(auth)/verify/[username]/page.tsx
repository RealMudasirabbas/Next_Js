"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { verifySchema } from "@/schemas/verifySchema";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function verifyAccount() {
    const router = useRouter();
    const { toast } = useToast();
    const params = useParams<{ username: string }>();

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
    });

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post("/api/verify-code", {
                username: params.username,
                code: data.code,
            });

            toast({
                title: "Success",
                description: response.data.message,
                variant: "success",
            });

            router.replace("sign-in");
        } catch (error) {
            console.error("Error in verification", error);
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;

            toast({
                title: "Verification failed",
                description: errorMessage,
                variant: "destructive",
            });
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-6 lg:text-5xl">
                        Verify your account
                    </h1>
                    <p className="mb-4">
                        Please enter the verification code sent to your email
                    </p>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="code" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button variant="default" type="submit">
                            Verify
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default verifyAccount;
