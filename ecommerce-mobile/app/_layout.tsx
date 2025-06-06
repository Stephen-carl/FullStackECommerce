import {  Link, Stack } from "expo-router";
import '@/global.css'
// import the glustack here
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from "@/components/ui/icon";
import { ShoppingCart, User } from "lucide-react-native";
import { Pressable } from "react-native";
import { useCart } from "@/store/cartStore";
import { Text } from "@/components/ui/text";
import { Platform } from 'react-native';

const queryClient = new QueryClient();


export default function RootLayout() {
    // to add the number of items in the cartbag
    const cartItemNum = useCart((state: any) => state.items.length)
    return (
        <QueryClientProvider client={queryClient}>
        <GluestackUIProvider>
            <Stack screenOptions={{ 
                headerRight: ()=> 
                <Link href={'/cart'} asChild>
                    <Pressable className="flex-row gap-2">
                        <Icon as={ShoppingCart}/>
                        <Text>{cartItemNum}</Text>
                    </Pressable>
                </Link>,
                }}>
                <Stack.Screen name="index" options={{ 
                title: "Shop", 
                headerLeft: ()=> 
                <Link href={'/login'} asChild>
                    <Pressable className="flex-row gap-2">
                        <Icon as={User}/>
                    </Pressable>
                </Link>}}/>

            </Stack>
        </GluestackUIProvider>
        </QueryClientProvider>
    )
}