import { gql, useQuery } from "@apollo/client"

const GET_BRANDS = gql`
  query Brands {
    brands(orderBy:{orderNumber: asc}) {
      id name products{id}
      models(orderBy:{orderNumber: asc}) {
        id name products{id}
        capacities(orderBy:{orderNumber: asc}) {
          products{id}
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

export function DisplayBrnads() {
  const { loading, error, data } = useQuery(GET_BRANDS)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <table bgcolor="" border={1} align="center">
      <tbody>
        <tr>
          <th style={{ "backgroundColor": "#99ff99" }} colSpan={6}>新新二手报价</th>
        </tr>
        <tr>
          <td style={{ "backgroundColor": "" }} colSpan={6}>电话：13028809527 微信同步</td>
        </tr>
        <tr>
          <td>品牌</td>
          <td>型号</td>
          <td>容量</td>
          <td>颜色</td>
          <td>版本</td>
          <td>价格</td>
        </tr>
        {data.brands.map(function (brand) {
          console.log(brand);
          if (!brand.products.length) {
            return
          }
          return (
            brand.models.map(function (model) {
              if (!model.products.length) {
                return
              }
              return (
                model.capacities.map(function (capacity) {
                  if (!capacity.products.length) {
                    return
                  }
                  return (
                    <>
                      {capacity.products.map(product => (
                        <tr key={product.id}>
                          <td>{product.brand?.name}</td>
                          <td>{product.model?.name}</td>
                          <td>{product.capacity?.name}</td>
                          <td>{product.color?.name}</td>
                          <td>{product.version?.name}</td>
                          {product.price ? (<td>{(parseInt(product?.price) + 100)}</td>) : null}
                        </tr>
                      ))}
                      <tr style={{ backgroundColor: "#99ff99" }}><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    </>
                  )
                })
              )
            })
          )
        })}
      </tbody>
    </table>
  )
}

export default function List() {
  return (
    <DisplayBrnads />
  )
}