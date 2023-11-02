import { gql, useQuery } from "@apollo/client"
import { Button, Picker, Popup, Sticky } from 'react-vant'
import { Search, ArrowDown } from '@react-vant/icons'
import { useState } from "react"

const GET_PRODUCTS = gql`
	query Products {
		brands {
			id
			name
		}
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

const GET_PRODUCTS_BY_BRAND = gql`
	query Products ($brand: ID){
		brands {
			id
			name
		}
		models(where: {brand: {id: {equals: $brand}}}) {
			id
			name
		}
		products(orderBy: { id: desc }, where: {brand: {id: {equals : $brand}}}) {
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

const GET_PRODUCTS_BY_BRAND_AND_MODEL = gql`
	query Products ($brand: ID, $model: ID){
		brands {
			id
			name
		}
		products(
			orderBy: { id: desc }, 
			where: {
				brand: { id: { equals: $brand } }
            	model: { id: { equals: $model } }
			}
		) {
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

console.log(GET_PRODUCTS);

const GET_BRANDS = gql`
	query Brands {
		brands {
			id
			name
		}
	}
`

export function DisplayBrnads() {
	const [visible, setVisible] = useState(false)
	const [select, setSelect] = useState('')
	const [attribute, setAttribute] = useState({
		brand: '',
		model: '',
		capacity: '',
		color: '',
		version: ''
	})

	let loading, error, data;
	if (attribute.brand) {
		({ loading, error, data } = useQuery(GET_PRODUCTS_BY_BRAND, {
			variables: {
				brand: attribute.brand
			}
		}))
		// ({ loading, error, data } = useQuery(GET_PRODUCTS))
	}
	// if (attribute.model) {
	// 	console.log('5555555555555555555555555');
	// 	// ({ loading, error, data } = useQuery(GET_PRODUCTS_BY_BRAND, {
	// 	// 	variables: {
	// 	// 		brand: attribute.brand,
	// 	// 		model: attribute.model
	// 	// 	}
	// 	// }))
	// }
	// if (attribute.brand && attribute.model) {
	// 	({ loading, error, data } = useQuery(GET_PRODUCTS_BY_BRAND_AND_MODEL, {
	// 		variables: {
	// 			brand: attribute.brand,
	// 			model: attribute.brand,
	// 		}
	// 	}))
	// }
	else {
		// ({ loading, error, data } = useQuery(GET_PRODUCTS))
		// data = useQuery(GET_PRODUCTS)[2]
		({ loading, error, data } = useQuery(GET_PRODUCTS, {

		}))
	}
	// const { loading, error, data } = useQuery(GET_PRODUCTS)




	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;
	// setBrands(data.brands)



	console.log('brands', data.brands);
	console.log('models', data.models);
	console.log('products', data.products)

	const columns = data.brands.map(brand => ({
		text: brand.name,
		value: brand.id
	}))

	// let modelColumns
	// if (attribute.brand.length) {
	// 	 modelColumns = data.models.map(model => ({
	// 		text: model.name,
	// 		value: model.id
	// 	}))
	// }

	return (
		<div style={{ display: "flex", justifyContent: "center", marginTop: "50px"}}>
			<table border={''}>
				<tbody>
					<tr>
						<th style={{ "backgroundColor": "#99ff99" }} colSpan={6}>新新二手报价</th>
					</tr>
					<tr>
						<td style={{ "backgroundColor": "" }} colSpan={6}>电话：13028809527 微信同步</td>
					</tr>
					<tr>
						<Picker
							popup={{
								round: true,
							}}
							title='选择品牌'
							columns={columns}
							onChange={(val, selectRow, index) => {
								// console.log('选中项: ', selectRow)
								// setSelect(selectRow.value)

							}}
							// onCancel={() => Toast.info('点击取消按钮')}
							onConfirm={(selectRow) => {
								// console.log('发射', selectRow);
								setAttribute(preAttribute => ({
									...preAttribute,
									brand: selectRow
								}))
							}}
						// onConfirm={() => setAttribute((selectRow) => ({ ...attribute, brand: selectRow.value }))}
						>
							{(val, _, actions) => {
								return (
									<td onClick={() => actions.open()}>品牌 <ArrowDown></ArrowDown></td>
								)
							}}
						</Picker>
						{/* {attribute.brand ? (
							<Picker
								popup={{
									round: true,
								}}
								title='选择型号'
								columns={columns}
								onChange={(val, selectRow, index) => {
									// console.log('选中项: ', selectRow)
									// setSelect(selectRow.value)

								}}
								onCancel={() => Toast.info('点击取消按钮')}
								onConfirm={(selectRow) => {
									// console.log('发射', selectRow);
									setAttribute(preAttribute => ({
										...preAttribute,
										brand: selectRow
									}))
								}}
							// onConfirm={() => setAttribute((selectRow) => ({ ...attribute, brand: selectRow.value }))}
							>
								{(val, _, actions) => {
									return (
										<td onClick={() => actions.open()}>型号 <ArrowDown></ArrowDown></td>
									)
								}}
							</Picker>
						) : (<td>型号</td>)} */}
						<td>型号</td>
						<td onClick={() => console.log(223)}>容量 </td>
						<td>颜色 </td>
						<td>版本 </td>
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