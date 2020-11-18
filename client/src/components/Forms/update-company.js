import React from "react";
import api from "../../service/api";
import { Form, Input, Button, Layout, Breadcrumb } from "antd";
import "../../styles/forms.css";

const { Header, Content, Footer } = Layout;


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

const UpdateCompanyForm = () => {
  const onFinish = (values) => {

    const id = window.localStorage.getItem('company_id');

    api.put("update-company", { name: values, _id: id }).then(({ data }) => {

      window.localStorage.setItem("company_id", data._id);
      console.log("Success:", data);


      setTimeout(() => {      
        window.location.href = "/";
      }, 1000);

    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="content-header">
            <h1>Project Tractian - Editar Empresa</h1>
          </div>
      </Header>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Início</Breadcrumb.Item>
          <Breadcrumb.Item>Editar Empresa</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <div className="container">
            <h1>Atualize o campo abaixo:</h1>
            <p>Obs: Você está editando a empresa selecionada no menu ao lado esquerdo.</p>
            <Form
              {...layout}
              name="form_update_companies"
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
                    message: "Por favor, insira um nome para a empresa!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Atualizar
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Project Tractian ©2020 Created by Claudio Pimentel
      </Footer>
    </Layout>
  );
};

export default UpdateCompanyForm;
