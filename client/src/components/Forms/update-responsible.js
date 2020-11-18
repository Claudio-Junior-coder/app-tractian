import React, { useState, useEffect } from "react";
import api from "../../service/api";
import { Form, Input, Button, Select, Layout, Breadcrumb } from "antd";
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

const UpdateResponsibleForm = () => {
  const [listNamesAssets, setListNamesAssets] = useState([]);
  const [listNamesResponsibles, setListNamesResponsibles] = useState([]);

  useEffect(() => {
    api.get("asset").then((response) => {
      setListNamesAssets(response.data.assets);
    });
    api.get("responsible").then((response) => {
      setListNamesResponsibles(response.data.responsibles);
    });
  }, []);

  const onFinish = (values) => {
    api
      .put("update-responsible", {
        _id: values.responsibleUser,
        name: values.name,
        responsibleAssets: values.responsibleAssets,
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
          <h1>Project Tractian - Editar Responsável</h1>
        </div>
      </Header>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Início</Breadcrumb.Item>
          <Breadcrumb.Item>Editar Responsável</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <div className="container">
            <h1>Informe os campos abaixo:</h1>

            <Form
              {...layout}
              name="form_update_responsibles"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="responsibleUser"
                label="Responsável"
                rules={[
                  {
                    required: true,
                    message: "Selecione o responsável para editar.",
                  },
                ]}
              >
                <Select placeholder="Selecione o responsável para editar.">
                  {listNamesResponsibles.map((val) => {
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
                    message: "Insira um nome para o responsável!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="responsibleAssets"
                label="Ativo"
                rules={[
                  {
                    required: true,
                    message: "Selecione ativos para este usuário.",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Selecione ativos para este usuário."
                >
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

export default UpdateResponsibleForm;
