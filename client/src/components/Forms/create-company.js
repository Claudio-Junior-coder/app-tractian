import React from 'react'
import api from "../../service/api";
import { Form, Input, Button } from 'antd';
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

const CreateCompanyForm = () => {

  const onFinish = (values) => {
    console.log('Success:', values);
    api.post('create', {name: values})
      .then(({ data }) => {
        window.localStorage.setItem('company_id', data.company._id)
 
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
      <h1>(Nova Empresa) Preencha o campo abaixo:</h1>

        <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Nome" name="name" rules={[
          {
            required: true,
            message: 'Por favor, insira um nome para a empresa!',
          },
        ]}
      >
        <Input/>
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

export default CreateCompanyForm
