import { Text } from "@/components/ui/text";
import { Stack, useLocalSearchParams } from "expo-router";
import { Card } from '@/components/ui/card'
import { Image } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { ButtonText } from '@/components/ui/button'
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native";
import { fetchProductByID } from "@/api/products";

export default function ProductDetails() {
    const {id} = useLocalSearchParams();
    console.log(id);
    
    // so it is getting the hierachy of the cache by storing the id under the products
    const { data : product, isLoading, error} = useQuery({
        queryKey : ['products', id],
        queryFn : () => fetchProductByID(String(id)),
    })

    // set what happens when the request is still loading
    if (isLoading) {
        return <ActivityIndicator />
    }
    // then for the error, display a toast
    if (error) {
        return <Text>Error fetching the product</Text>
    }

    return (
        // i'll add a box to wrap the card
        <Box className="flex-1 items-center p-1">
        {/* the max-w-[360px] is to make sure that while it takes the full width, it should not exceed the given max width */}
        <Stack.Screen options={{ title: product.name}} />
        <Card className="p-5 rounded-lg max-w-[560px] w-full">
            <Image
                source={{
                    uri: product.image,
                }}
                className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
                alt={`${product.name} image`}
                resizeMode='contain'
            />
            <Text className="text-sm font-normal mb-2 text-typography-700">
                {product.name}
            </Text>
            <VStack className="mb-6">
                <Heading size="md" className="mb-4">
                {product.price}
                </Heading>
                <Text size="sm">
                {product.description}
                </Text>
            </VStack>
            <Box className="flex-col sm:flex-row">
                <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
                <ButtonText size="sm">Add to cart</ButtonText>
                </Button>
                <Button
                variant="outline"
                className="px-4 py-2 border-outline-300 sm:flex-1"
                >
                <ButtonText size="sm" className="text-typography-600">
                    Wishlist
                </ButtonText>
                </Button>
            </Box>
        </Card>
        </Box>
    )
}