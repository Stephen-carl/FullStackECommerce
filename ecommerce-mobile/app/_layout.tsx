import {  Stack } from "expo-router";
import '@/global.css'
// import the glustack here
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
        <GluestackUIProvider>
            <Stack>
                <Stack.Screen name="index" options={{ title: "Shop"}}/>

                </Stack>
        </GluestackUIProvider>
        </QueryClientProvider>
    )
}