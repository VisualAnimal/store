import { gql, useQuery } from "@apollo/client"

const GET_BRANDS = gql`
	query Products {
		products(orderBy: { id: desc }) {
			brand {
				name
			}
			model {
				name
			}
			capacity {
				name
			}
			color {
				name
			}
			version {
				name
			}
			price
			id
		}
	}
`

export function DisplayBrnads() {
	const { loading, error, data } = useQuery(GET_BRANDS)

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	const zebraStripeEven = {
		backgroundColor: "#f2f2f2" /* 设置偶数行的背景颜色 */
	}

	const zebraStripeOdd = {
		backgroundColor: "#ffffff" /* 设置奇数行的背景颜色 */
	}

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<table border={''}>
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
					{data.products.map((product, index) => (
						<tr key={product.id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
							<td>{product.brand?.name}</td>
							<td>{product.model?.name}</td>
							<td>{product.capacity?.name}</td>
							<td>{product.color?.name}</td>
							<td>{product.version?.name}</td>
							{product.price ? (<td>{(parseInt(product?.price) + 100)}</td>) : null}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default function List() {
	return (
		<DisplayBrnads />
	)
}