import {  Stack } from "expo-router";
import '@/global.css'
// import the glustack here
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
    return (
        <GluestackUIProvider mode="dark">
            <Stack/>
        </GluestackUIProvider>
    )
}