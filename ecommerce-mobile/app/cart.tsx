import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useCart } from "@/store/cartStore";
import { Redirect } from "expo-router";
import { FlatList, View } from "react-native";

// lets start by exporting the home screen that itll be rendering when i go to the url slash
export default function CartScreen() {
    // display items in the global cart store
    const items = useCart((state : any) => state.items)
    console.log(items);

    const resetcard = useCart((state : any) => state.resetCart)

    const onCheckout = async()=> {
        // send order to server
        // change set of the cart
        resetcard()
    }

    // if there are no items in the cart take user to the dashboard
    if (items.length === 0) {
        return <Redirect href={'/'} />
    }
    return(
        <View>
            <FlatList
            data={items}
            contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
            renderItem={( {item} ) =>(
                // design how each box should look like
                <HStack className="bg-white p-3">
                    <Image
                        source={{
                                uri: item.product.image,
                            }}
                            className="mb-2 h-[48px] w-[48px] rounded-md aspect-[4/3]"
                            alt={`${item.product.name} image`}
                            resizeMode='contain'
                    />
                    <VStack>
                        <Text bold>{item.product.name}</Text>
                        <Text>{item.product.price}</Text>
                    </VStack>
                    <Text className="ml-auto">{item.quantity}</Text>
                </HStack>
            )}
            // i can add a button to checkout
            ListFooterComponent={() => (
                <Button className="ml-5 mr-5 mt-2" onPress={onCheckout}>
                    <ButtonText>Checkout</ButtonText>
                </Button>
            )}
            />
        </View>
    )
}