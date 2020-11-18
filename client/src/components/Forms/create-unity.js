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

const CreateUnityForm = () => {
  const onFinish = (values) => {
    api
      .post("unities", {
        name: values.name,
        data: values.countAssets,
        token: window.localStorage.getItem("company_id"),
      })
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        setTimeout(() => {
          window.location.href = "/create-asset";
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
          <h1>Project Tractian - Nova Unidade</h1>
        </div>
      </Header>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Início</Breadcrumb.Item>
          <Breadcrumb.Item>Criar Unidade</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <div className="container">
            <h1>Insira um nome para a unidade:</h1>

            <Form
              {...layout}
              name="form_create_unities"
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

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Cadastrar
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

export default CreateUnityForm;
