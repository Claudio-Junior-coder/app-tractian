import React, { useState, useEffect } from "react";
import api from "../../service/api";
import {
  Layout,
  Breadcrumb,
  Form,
  Input,
  Button,
  Select,
  InputNumber,
} from "antd";
import "../../styles/forms.css";
import "../../styles/App.css";

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

const CreateAssetForm = () => {
  const [listNamesUnities, setListNamesUnity] = useState([]);

  useEffect(() => {
    api.get("unity").then((response) => {
      setListNamesUnity(response.data.unities);
    });
  }, []);

  const onFinish = (values) => {
    console.log(values);
    api
      .post("assets", {
        token: window.localStorage.getItem("company_id"),
        unity: values.unity_ID,
        image: values.image,
        name: values.name,
        description: values.description,
        model: values.model,
        state: values.state,
        healthscore: values.healthscore,
      })
      .then(() => {
        setTimeout(() => {
          window.location.href = "/create-responsible";
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
          <h1>Project Tractian - Novo Ativo</h1>
        </div>
      </Header>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Início</Breadcrumb.Item>
          <Breadcrumb.Item>Criar Ativo</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <div className="container">
            <h1>Preencha os campos abaixo:</h1>

            <Form
              {...layout}
              name="form_create_assets"
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
                    message: "Selecione uma unidade para este ativo.",
                  },
                ]}
              >
                <Select placeholder="Selecione uma unidade para este ativo.">
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
                label="Imagem URL"
                name="image"
                rules={[
                  {
                    required: true,
                    message: "Insira uma url de imagem!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Nome"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Insira um nome para o ativo!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Descrição" name="description">
                <Input />
              </Form.Item>

              <Form.Item
                label="Modelo"
                name="model"
                rules={[
                  {
                    required: true,
                    message: "Insira um nome de um modelo.",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="state"
                label="Status"
                rules={[
                  {
                    required: true,
                    message: "Selecione um status.",
                  },
                ]}
              >
                <Select placeholder="Selecione um status">
                  <Select.Option value="Disponível"> Disponível </Select.Option>
                  <Select.Option value="Manutenção"> Manutenção </Select.Option>
                  <Select.Option value="Desativado"> Desativado </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Nível de saúde"
                name="healthscore"
                rules={[
                  {
                    required: true,
                    message: "Insira um número entre 1 e 100.",
                  },
                ]}
              >
                <InputNumber min={1} max={100} />
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

export default CreateAssetForm;
