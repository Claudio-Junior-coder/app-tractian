import React from "react";
import api from "../../service/api";
import { Form, Input, Button } from "antd";
import "../../styles/forms.css";

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

const CreateUnityForm = () => {

  const onFinish = (values) => {
    api.post('unities', {name: values.name, data: values.countAssets, token: window.localStorage.getItem('company_id')}).then(res => {
      console.log(res.data)
    }).then(() => {
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
    }) 
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container">
      <h1>(Nova Unidade) Preencha os campos abaixo:</h1>

      <Form
        {...layout}
        name="form_unity"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Nome"
          name="name"
          rules={[
            {
              required: true,
              message: "Por favor, insira um nome para a unidade!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Total de Ativos"
          name="countAssets"
          rules={[
            {
              required: true,
              message:
                "Por favor, insira a quantidade de ativos que pretende cadastrar.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateUnityForm;
