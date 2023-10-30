import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_ATTRIBUTE = gql`
    query GetBrands {
        brands(orderBy:{orderNumber: asc}) {
            id name
            models(orderBy:{orderNumber: asc}) {
                id name
                capacities(orderBy:{orderNumber: asc}) {
                    id name
                }
                colors(orderBy:{orderNumber: asc}){
                    id name
                }
                versions(orderBy:{orderNumber: asc}){
                    id name
                }
            }
        }
    }
`

const ADD_PRODUCT = gql`
    mutation AddProduct($brand: ID, $model: ID, $capacity: ID, $color: ID, $version: ID, $price: String){
        createProduct(data: {
            brand: {connect: {id: $brand}},
            model: {connect: {id: $model}},
            capacity: {connect: {id: $capacity}},
            color: {connect: {id: $color}},
            version: {connect: {id: $version}},
            price: $price
        }){
            id
        }
    }
`
const ADD_PRODUCT_WITH_NOT_VERSION = gql`
    mutation AddProduct($brand: ID, $model: ID, $capacity: ID, $color: ID, $price: String){
        createProduct(data: {
            brand: {connect: {id: $brand}},
            model: {connect: {id: $model}},
            capacity: {connect: {id: $capacity}},
            color: {connect: {id: $color}},
            price: $price
        }){
            id
        }
    }
`

export default function Product() {
    const [attribute, setAttribute] = useState({
        brand: '',
        model: '',
        capacity: '',
        color: '',
        version: '',
    })
    const { loading, error, data } = useQuery(GET_ATTRIBUTE)
    // 允许不添加version
    let createProduct
    if (attribute.version) {
        console.log('yes');
        createProduct = useMutation(ADD_PRODUCT)[0]
    }else{
        console.log('no');
        createProduct = useMutation(ADD_PRODUCT_WITH_NOT_VERSION)[0]
    }

    // 添加商品
    const handleAddProduct = async () => {
        const price = prompt(`请输入商品价格`)
        if (price) {
            // console.log(price);
            try {
                const response = await createProduct({
                    variables: {
                        brand: attribute.brand,
                        model: attribute.model,
                        capacity: attribute.capacityId,
                        color: attribute.colorId,
                        version: attribute.versionId,
                        price: price
                    }
                })
                console.log(response.data.createProduct);
            } catch (error) {
                console.log('添加商品出错');
            }
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return data.brands.map(brand => (
        <ul key={brand.id}>
            <li>{brand.name}
                <ul>{brand.models.map(model => (
                    <li key={model.id}>{model.name} <span>{attribute.capacity}{attribute.color}{attribute.version}</span> <button onClick={handleAddProduct}>添加</button>
                        <ul>
                            <li>{model.capacities.map(capacity => (
                                <span key={capacity.id}><button onClick={() => setAttribute(prevState => ({ ...prevState, capacity: capacity.name, capacityId: capacity.id, model: model.id, brand: brand.id }))}>{capacity.name}</button> </span>
                            ))}</li>
                            <li>{model.colors.map(color => (
                                <span key={color.id}><button onClick={() => setAttribute(prevState => ({ ...prevState, color: color.name, colorId: color.id, model: model.id, brand: brand.id }))}>{color.name}</button> </span>
                            ))}</li>
                            <li>{model.versions.map(version => (
                                <span key={version.id}><button onClick={() => setAttribute(prevState => ({ ...prevState, version: version.name, versionId: version.id, model: model.id, brand: brand.id }))}>{version.name}</button> </span>
                            ))}</li>
                        </ul>
                    </li>
                ))}
                </ul>
            </li>
        </ul>
    ))
}