import React, {useState, useEffect} from 'react'
import api from "../../service/api";
import { Form, Input, Button, Select } from 'antd';
import "../../styles/forms.css"

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const CreateResponsibleForm = () => {

  const [listNamesAssets, setListNamesAssets] = useState([]);

  useEffect(() => {
    api.get("asset").then((response) => {
      setListNamesAssets(response.data.assets);
    });
  }, []);

  const onFinish = (values) => {
    console.log('Success:', values);
    api.post('responsible', {name: values.name, responsibleAssets: values.responsibleAssets}).then(() => {
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
    }) 
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="container">
      <h1>(Novo Responsável) Preencha os campos abaixo:</h1>

        <Form
      {...layout}
      name="form_responsibles"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Nome" name="name" rules={[
          {
            required: true,
            message: 'Insira um nome para o responsável!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item name="responsibleAssets" label="Unidade" rules={[
            {
              required: true,
              message:
                "Selecione uma unidade para este ativo.",
            },
          ]}>
          <Select mode="multiple" placeholder="Selecione um ativo para este usuário.">
            {listNamesAssets.map((val) => {
              return (
                <Select.Option key={val._id} value={val._id}>
                  {" "}
                  {val.name}{" "}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>


      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Cadastrar
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}

export default CreateResponsibleForm
