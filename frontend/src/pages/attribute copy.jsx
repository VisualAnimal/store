import { useState } from "react"
import createApolloClient from "../apollo-client"
import { gql, useMutation } from "@apollo/client"

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
    })
    return {
        props: {
            brands: data.brands
        }
    }
}

export default function List({ brands }) {
    const [brandName, setBrandName] = useState(""); // 用于保存品牌名称的状态
    const [modelName, setModelName] = useState(""); // 用于保存型号名称的状态
    const [selectedBrandId, setSelectedBrandId] = useState(''); // 用于保存所选品牌的ID
    const [selectedModelId, setSelectedModelId] = useState(''); // 用于保存所选型号的ID

    const [id, setId] = useState("")
    const [value, setValue] = useState("")

    const addBrand = async () => {
        const ADD_BRAND_MUTATION = gql`
            mutation AddBrand($name: String!) {
                addBrand(name: $name) {
                    id
                    name
                }
            }
        `;
        const [addBrandMutation] = useMutation(ADD_BRAND_MUTATION);
        try {
            const { data } = await addBrandMutation({
                variables: {
                    name: value, // 使用你的状态变量
                    brand: id
                },
            });

            // console.log("Added brand:", data.addBrand);
            // 在这里可以更新本地状态或执行其他操作
        } catch (error) {
            console.error("Error adding brand:", error);
        }
        // 处理添加品牌的逻辑
        console.log("Adding brand: " + value);
        console.log("Adding brand id: " + id);
        // 可以将 brandName 发送到服务器或更新本地状态
        // setBrandName(""); // 清空输入框
    };

    const addModel = () => {
        // 处理添加型号的逻辑
        console.log("Adding model: " + value);
        console.log("Adding model id: " + id);
        // 可以将 modelName 发送到服务器或更新本地状态
        // setModelName(""); // 清空输入框
    };

    const addCapacity = () => {
        // 处理添加型号的逻辑
        console.log("Adding capacity: " + value);
        console.log("Adding capacity id: " + id);
        // 可以将 modelName 发送到服务器或更新本地状态
        // setModelName(""); // 清空输入框
    };

    const addColor = () => {
        // 处理添加型号的逻辑
        console.log("Adding color: " + value);
        console.log("Adding color id: " + id);
        // 可以将 modelName 发送到服务器或更新本地状态
        // setModelName(""); // 清空输入框
    };

    const addVersion = () => {
        // 处理添加型号的逻辑
        console.log("Adding version: " + value);
        console.log("Adding version id: " + id);
        // 可以将 modelName 发送到服务器或更新本地状态
        // setModelName(""); // 清空输入框
    };
    return (
        <div>
            <div>
                <input type="text"
                    placeholder="id"
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <div>
                <button onClick={addBrand}>添加品牌</button>
                <button onClick={addModel}>添加型号</button>
                <button onClick={addCapacity}>添加容量</button>
                <button onClick={addColor}>添加颜色</button>
                <button onClick={addVersion}>添加版本</button>
            </div>



            <ul>{brands.map(brand => (
                <li key={brand.id}>{brand.name} {brand.id}
                    <ul>{brand.models.map(model => (
                        <li key={model.id}>{model.name} {model.id}
                            <ul>
                                <li>{model.capacities.map(capacity => (
                                    <span key={capacity.id}>{capacity.name} </span>
                                ))}</li>
                                <li>{model.colors.map(color => (
                                    <span key={color.id}>{color.name} </span>
                                ))}</li>
                                <li>{model.versions.map(version => (
                                    <span key={version.id}>{version.name} </span>
                                ))}</li>
                            </ul>
                        </li>
                    ))}
                    </ul>
                </li>
            ))}
            </ul>
        </div>

    )
}