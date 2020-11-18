import React, { useState, useEffect } from "react";
import api from "../../service/api";
import { Form, Input, Button, Layout, Breadcrumb, Select } from "antd";
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

const UpdateUnityForm = () => {
  const [listNamesUnities, setListNamesUnity] = useState([]);

  useEffect(() => {
    api.get("unity").then((response) => {
      setListNamesUnity(response.data.unities);
    });
  }, []);

  const onFinish = (values) => {
    api
      .put("update-unities", {
        name: values.name,
        _id: values.unity_ID,
      })
      .then(() => {
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
          <h1>Project Tractian - Editar Unidade</h1>
        </div>
      </Header>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Início</Breadcrumb.Item>
          <Breadcrumb.Item>Editar Unidade</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <div className="container">
            <h1>Informe os campos abaixo:</h1>

            <Form
              {...layout}
              name="form_update_unity"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="unity_ID"
                label="Unidade"
                rules={[
                  {
                    required: true,
                    message: "Selecione uma unidade para editar.",
                  },
                ]}
              >
                <Select placeholder="Selecione uma unidade para editar.">
                  {listNamesUnities.map((val) => {
                    return (
                      <Select.Option key={val._id} value={val._id}>
                        {" "}
                        {val.name}{" "}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

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

export default UpdateUnityForm;
