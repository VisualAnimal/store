import { gql, useMutation, useQuery } from "@apollo/client"

const GET_BRANDS = gql`
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

// 创建通用的mutation函数
const createMutation = (mutation, variableName) => {
    return gql`
        mutation Create${variableName}($name: String!){
            ${mutation}(data: {name: $name}){
                id
                name
            }
        }
    `;
}

const createMutationWithConnect = (mutation, variableName, connectField, connectId) => {
    return gql`
        mutation Create${variableName}($name: String!, $${connectField}: ID!){
            ${mutation}(data: {
                name: $name,
                ${connectField}: { id: ${connectId} }
            }){
                id
                name
                ${connectField} {
                    id
                }
            }
        }
    `;
}


// 使用通用的mutation函数来创建ADD_BRAND mutation
const ADD_BRAND = createMutation("createBrand", "Brand");
const ADD_MODEL = createMutationWithConnect("createModel", "Model","brandId",'cloci7fn7000pmg5ef7exr9e4cloci7fn7000pmg5ef7exr9e4');

export function DisplayAttribute() {
    const { loading, error, data } = useQuery(GET_BRANDS)
    const [createBrand] = useMutation(ADD_BRAND, {
        refetchQueries: [
            GET_BRANDS
        ]
    })
    const [createModel] = useMutation(ADD_MODEL, {
        refetchQueries: [
            GET_BRANDS
        ]
    })
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    // 抽象的函数，接受品牌名称和回调函数作为参数
    const handleAddItem = async (itemName, mutationFunction, paramName, paramValue) => {
        const name = prompt(`请输入新${itemName}的名称`);
        if (name) {
            const variables = { input: { name } };
            if (paramName && paramValue !== undefined) {
                variables.input[paramName] = paramValue;
            }
            const response = await mutationFunction({
                variables,
            });
            if (response.data) {
                console.log(`${itemName}添加成功`);
            }
        }
    };

    const handleAddItemWithConnect = async (itemName, mutationFunction, paramName, paramValue) => {
        const name = prompt(`请输入新${itemName}的名称`);
        if (name) {
            const variables = { input: { name } };
            if (paramName && paramValue !== undefined) {
                variables.input[paramName] = { connect: paramValue };
            }
            const response = await mutationFunction({
                variables,
            });
            if (response.data) {
                console.log(`${itemName}添加成功`);
            }
        }
    }
    

    const handleAddBrand = async () => {
        handleAddItem('品牌', createBrand)
    }

    const handleAddModel = async (brandId) => {
        console.log(brandId);
        handleAddItemWithConnect('型号', createModel, 'brandId', brandId)
    }

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

export default function Attribute() {
    return (
        <DisplayAttribute />
    )
}