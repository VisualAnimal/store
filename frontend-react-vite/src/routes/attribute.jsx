import { gql, useMutation, useQuery } from "@apollo/client"

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

const ADD_BRAND = gql`
    mutation CreateBrand($name: String!){
        createBrand(data: {name: $name}){
            id
            name
        }
    }
`

const ADD_MODEL = gql`
    mutation CreateModel($name: String!, $id: ID){
        createModel(data: {
            name: $name, 
            brand: {connect:{id: $id}}
        }){
            id
            name
        }
    }
    
`

const ADD_CAPACITY = gql`
    mutation CreateCapacity($name: String!, $modelId: ID) {
        createCapacity(data: {
            name: $name,
            model: { connect: { id: $modelId } }
        }) {
            id
            name
        }
    }
`;

const ADD_COLOR = gql`
    mutation CreateColor($name: String!, $modelId: ID) {
        createColor(data: {
            name: $name,
            model: { connect: { id: $modelId } }
        }) {
            id
            name
        }
    }
`;

const ADD_VERSION = gql`
    mutation CreateVersion($name: String!, $modelId: ID) {
        createVersion(data: {
            name: $name,
            model: { connect: { id: $modelId } }
        }) {
            id
            name
        }
    }
`

export function DisplayAttribute() {
    const { loading, error, data } = useQuery(GET_ATTRIBUTE)
    const [createBrand] = useMutation(ADD_BRAND, {
        refetchQueries: [GET_ATTRIBUTE]
    })
    const [createModel] = useMutation(ADD_MODEL, {
        refetchQueries: [GET_ATTRIBUTE]
    })
    const [createCapacity] = useMutation(ADD_CAPACITY, {
        refetchQueries: [GET_ATTRIBUTE]
    });

    const [createColor] = useMutation(ADD_COLOR, {
        refetchQueries: [GET_ATTRIBUTE]
    });

    const [createVersion] = useMutation(ADD_VERSION, {
        refetchQueries: [GET_ATTRIBUTE]
    });

    // 创建品牌
    const handleAddBrand = async () => {
        const brandName = prompt(`请输入品牌的名称`)
        if (brandName) {
            try {
                const response = await createBrand({
                    variables: { name: brandName }
                })
                console.log('新增的品牌信息:', response.data.createBrand);
            } catch (error) {
                console.error('发生错误:', error);
            }
        }
    }

    // 创建型号
    const handleAddModel = async (brandId) => {
        console.log(brandId);
        const modelName = prompt(`请输入型号的名称`)
        if (modelName) {
            try {
                const response = await createModel({
                    variables: {
                        name: modelName,
                        id: brandId
                    }
                })
                console.log('新增的型号信息:', response.data.createModel);
            } catch (error) {
                console.error('发生错误:', error);
            }
        }
    }

    // 创建容量
    const handleAddCapacity = async (modelId) => {
        const capacityName = prompt(`请输入容量的名称`);
        if (capacityName) {
            try {
                const response = await createCapacity({
                    variables: {
                        name: capacityName,
                        modelId: modelId
                    }
                });
                console.log('新增的容量信息:', response.data.createCapacity);
            } catch (error) {
                console.error('发生错误:', error);
            }
        }
    };

    // 创建颜色
    const handleAddColor = async (modelId) => {
        const colorName = prompt(`请输入颜色的名称`);
        if (colorName) {
            try {
                const response = await createColor({
                    variables: {
                        name: colorName,
                        modelId: modelId
                    }
                });
                console.log('新增的颜色信息:', response.data.createColor);
            } catch (error) {
                console.error('发生错误:', error);
            }
        }
    }
    // 创建版本
    const handleAddVersion = async (modelId) => {
        const versionName = prompt(`请输入版本的名称`);
        if (versionName) {
            try {
                const response = await createVersion({
                    variables: {
                        name: versionName,
                        modelId: modelId
                    }
                });
                console.log('新增的版本信息:', response.data.createVersion);
            } catch (error) {
                console.error('发生错误:', error);
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
        <div>
            <ul>
                <li><button onClick={handleAddBrand}>添加品牌</button></li>
                {data.brands.map(brand => (
                    <li key={brand.id}>{brand.name}
                        <ul>
                            <li><button onClick={() => handleAddModel(brand.id)}>添加型号</button></li>
                            {brand.models.map(model => (
                                <li key={model.id}>{model.name}
                                    <ul>
                                        <li>
                                            {model.capacities.map(capacity => (
                                                <span key={capacity.id}>{capacity.name} </span>
                                            ))}
                                            <button onClick={() => handleAddCapacity(model.id)}>添加容量</button>
                                        </li>
                                        <li>
                                            {model.colors.map(color => (
                                                <span key={color.id}>{color.name} </span>
                                            ))}
                                            <button onClick={() => handleAddColor(model.id)}>添加颜色</button>
                                        </li>
                                        <li>
                                            {model.versions.map(version => (
                                                <span key={version.id}>{version.name} </span>
                                            ))}
                                            <button onClick={() => handleAddVersion(model.id)}>添加版本</button>
                                        </li>
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

export default function Attribute() {
    return (
        <DisplayAttribute />
    )
}