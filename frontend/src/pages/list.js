import createApolloClient from "../apollo-client"
import { gql } from "@apollo/client"

export async function getServerSideProps() {
    const client = createApolloClient()
    const { data } = await client.query({
        query: gql`
            query Brands {
                brands(orderBy:{orderNumber: asc}) {
                    id name
                    models(orderBy:{orderNumber: asc}) {
                        id name
                        capacities(orderBy:{orderNumber: asc}) {
                            products{
                                id
                                brand{name} 
                                model{name} 
                                capacity{name} 
                                color{name} 
                                version{name} 
                                price
                            }
                        }
                    }
                }
            }
        `
    })
    return {
        props: {
            brands: data.brands
        }
    }
    // const { data } = await client.query({
    //     query: gql`
    //         query Products {
    //             products {
    //                 id
    //                 name
    //                 brand {
    //                     name
    //                 }
    //                 model {
    //                     name
    //                 }
    //                 capacity {
    //                     name
    //                 }
    //                 color {
    //                     name
    //                 }
    //                 version {
    //                     name
    //                 }
    //                 price
    //             }
    //         }
    //     `
    // })
    // return {
    //     props: {
    //         products: data.products
    //     }
    // }
}

export default function List({ brands }) {
    console.log(brands);
    return (
        <table border={1} align="center">
            <tbody>
                <tr>
                    <th style={{ "background-color": "#99ff99" }} colSpan={6}>新新二手报价</th>
                </tr>
                <tr>
                    <td style={{ "background-color": "#fdf5e6" }} colSpan={6}>电话：13028809527 微信同步</td>
                </tr>
                <tr>
                    <td>品牌</td>
                    <td>型号</td>
                    <td>容量</td>
                    <td>颜色</td>
                    <td>版本</td>
                    <td>价格</td>
                </tr>
                {brands.map(brand => (
                    brand.models.map(model => (
                        model.capacities.map(capacity => (
                            capacity.products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.brand?.name}</td>
                                    <td>{product.model?.name}</td>
                                    <td>{product.capacity?.name}</td>
                                    <td>{product.color?.name}</td>
                                    <td>{product.version?.name}</td>
                                    {product.price?(<td>{(parseInt(product?.price)+100)}</td>):null}
                                    
                                </tr>
                            ))

                        ))
                    ))
                ))}
            </tbody>
        </table>
        // <table border={1} align="center" >
        //     <tbody>
        //         <tr>
        //             <th style={{ "background-color": "#99ff99" }} colSpan={6}>新新二手报价</th>
        //         </tr>
        //         <tr>
        //             <td style={{ "background-color": "#fdf5e6" }} colSpan={6}>电话：13028809527 微信同步</td>
        //         </tr>
        //         <tr>
        //             <td>品牌</td>
        //             <td>型号</td>
        //             <td>容量</td>
        //             <td>颜色</td>
        //             <td>版本</td>
        //             <td>价格</td>
        //         </tr>
        //         {products.map(product => (
        //             <tr key={product.id}>
        //                 <td>{product.brand?.name}</td>
        //                 <td>{product.model?.name}</td>
        //                 <td>{product.capacity?.name}</td>
        //                 <td>{product.color?.name}</td>
        //                 <td>{product.version?.name}</td>
        //                 <td>{product?.price}</td>
        //             </tr>
        //         ))}
        //     </tbody>

        // </table>
    )
}