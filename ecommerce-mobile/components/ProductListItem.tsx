import { Text } from 'react-native'


// my flat list component
export default function ProductListItem({ product }){
    return (
        <Text style={{ fontSize : 16}}>{product.name}</Text>
    )
}