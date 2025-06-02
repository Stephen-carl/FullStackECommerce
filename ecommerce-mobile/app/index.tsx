import { FlatList, Text, View } from "react-native";
import products from '../assets/products.json';
import ProductListItem from "../components/ProductListItem";


// lets start by exporting the home screen that itll be rendering when i go to the url slash
export default function HomeScreen() {
    return(
        // {/* so the products i want to display and renderItem is how each item should be displayed. so i have to design how each show look. */}
        <FlatList 
        data={products} 
        // SO i can call the component after designing it
        renderItem={({ item }) => <ProductListItem product={item}/>}
        />
    );
}