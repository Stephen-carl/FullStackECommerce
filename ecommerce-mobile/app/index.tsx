import { ActivityIndicator, FlatList } from "react-native";
import ProductListItem from "../components/ProductListItem";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";
import { listProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";
import { Text } from "@/components/ui/text";


// lets start by exporting the home screen that itll be rendering when i go to the url slash
export default function HomeScreen() {
    // tanstack query can replace useState and useEffect 
    const { data, isLoading, error} = useQuery({
        queryKey : ['products'],
        queryFn : listProducts,
    })

    // set what happens when the request is still loading
    if (isLoading) {
        return <ActivityIndicator />
    }
    // then for the error, display a toast
    if (error) {
        return <Text>Error fetching products</Text>
    }

    // // so here i use a useState to get, store and display the data
    // const [products, setProducts] = useState([]);

    // // call the API here
    // useEffect(() =>{
    //     const fetchProducts = async () => {
    //     const data = await listProducts();
    //     // load the data and store it in the state
    //     setProducts(data)
    //     };
    //     fetchProducts();
    // },[])
    
    // to make the number of columns responsive on the web i can add some VariableContext
    const numColumns = useBreakpointValue({
        // using a default column value

        default : 2,
        md : 3,
        xl: 4,
        sm :3
    })
    return(
        // {/* so the products i want to display and renderItem is how each item should be displayed. so i have to design how each show look. */}
        <FlatList 
        key={numColumns}
        // the data here will be empty at first
        // once the data is fetched the setProduct takes effect
        data={data} 
        numColumns={numColumns}
        contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto"
        columnWrapperClassName="gap-2"
        // SO i can call the component after designing it
        renderItem={({ item }) => <ProductListItem product={item}/>}
        />
    );
}