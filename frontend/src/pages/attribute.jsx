import { gql, useQuery } from "@apollo/client"

const GET_BRANDS = gql`
    query Brands {
        brands {
            id
            name
        }
    }
`

export function DisplayBrnads() {
    return (<div>43</div>)
    // const { loading, error, data } = useQuery(GET_BRANDS)

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error : {error.message}</p>;

    // return data.brands.map(brand => (
    //     <h1>{brand.name}</h1>
    // ))
}

export default function Attribute() {
    return (
        <DisplayBrnads/>
    )
}