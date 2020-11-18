import React, { useState, useEffect } from "react";
import api from "../../service/api";
import { Form, Button, Layout, Breadcrumb, Select } from "antd";
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

const DeleteUnityForm = () => {

  const [listNamesUnities, setListNamesUnities] = useState([]);
  

  useEffect(() => {
    api.get("unity").then((response) => {
      setListNamesUnities(response.data.unities);
    });
  }, []);

  const onFinish = (values) => {
    api.delete(`delete-unity/${values.unity_ID}`)
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
            <h1>Project Tractian - Excluir Unidade</h1>
          </div>
      </Header>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Início</Breadcrumb.Item>
          <Breadcrumb.Item>Excluir Unidade</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <div className="container">
            <h1>Informe o campo abaixo:</h1>

            <Form
              {...layout}
              name="form_delete_unities"
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
                    message: "Selecione uma unidade para deletar.",
                  },
                ]}
              >
                <Select placeholder="Selecione uma unidade para deletar.">
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

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Deletar
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

export default DeleteUnityForm;
