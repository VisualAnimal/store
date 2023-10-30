import { gql, useMutation } from '@apollo/client';

const ADD_BRAND = gql`
  mutation CreateBranssd($name: String!) {
    createBrand(data: {name: $name}) {
      id
      name
    }
  }
`;

function MyComponent() {
  const [createBrand, { data }] = useMutation(ADD_BRAND);

  const handleAddBrand = async (brandName) => {
    try {
      const response = await createBrand({
        variables: { name: brandName }
      });
      // 可以在这里处理 mutation 返回的数据
      console.log('新增的品牌信息:', response.data.createBrand);
    } catch (error) {
      console.error('发生错误:', error);
    }
  };

  return (
    <div>
      {/* 在你的组件中触发 mutation，比如在点击事件中 */}
      <button onClick={() => handleAddBrand('新品牌名称')}>
        添加品牌
      </button>
    </div>
  );
}

export default MyComponent;
