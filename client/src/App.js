import React, { useState, useEffect } from "react";
import { Layout, Breadcrumb, Collapse, Progress  } from "antd";
import api from "./service/api";

import "./styles/App.css";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;

export default function App() {
  const [listNamesUnities, setListNamesUnities] = useState([]);
  const companyId = window.localStorage.getItem('company_id')
  const companyName = window.localStorage.getItem('company_name')

  useEffect(() => {
    api.get("companies").then((response) => {
      const companyName = response.data.companies.find(company => company._id === companyId)?.name;

      if (companyName) {
        window.localStorage.setItem('company_name', companyName);
      }
    });

    api.get(`unities-ids/${companyId}`).then((response) => {
      setListNamesUnities(response.data)
    });
    
  }, [companyId]);

  return (
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Início</Breadcrumb.Item>
          <Breadcrumb.Item>Visão Geral</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <h1> Exibindo todos os dados cadastrados desta empresa. </h1>
          <p>Para ver os dados de outra empresa, basta seleciona-la no menu do lado esquerdo.</p>

              <Collapse style={{ marginTop: "10px" }}>
                <Panel header={companyName}>
                  {listNamesUnities.map((val) => {        
                    return (                      
                      <Collapse defaultActiveKey="1" key={val._id} style={{marginTop: "10px"}}>
                        <Panel header={val.name} key={val._id}>
                        <h2 style={{textAlign: "center"}}> Ativos </h2>
                          <hr></hr>
                          {val.data.assetsData.map((vals) => {
                            console.log(val)
                            return (
                              <div key={vals._id} style={{ border: "1px solid #2194FF", borderRadius: "5px" , padding: "20px", margin: "10px"}}>
                                <p><span style={{ fontWeight: "bold"}}>Imagem url:</span> {vals.image}</p>
                                <p><span style={{ fontWeight: "bold"}}>Nome:</span> {vals.name}</p>
                                <p><span style={{ fontWeight: "bold"}}>Descrição:</span> {vals.description}</p>
                                <p><span style={{ fontWeight: "bold"}}>Modelo:</span> {vals.model}</p>
                                <p><span style={{ fontWeight: "bold"}}>Status:</span> {vals.state}</p>
                                {vals.responsibles.map((resp) => {
                                  return (
                                    <div key={resp._id}>
                                    <p><span style={{ fontWeight: "bold"}}>Responsável:</span> {resp.name}</p>
                                    </div>
                                  )
                                })}
                                <div style={{width: "170px"}}>
                                  <p><span style={{ fontWeight: "bold"}}>Nível de saúde:</span></p>
                                  <Progress percent={vals.healthscore} size="small" status="active" />
                                </div>              
                                
                              </div>
                            )
                          })}
                        </Panel>
                      </Collapse>
                      );
                    })}
                </Panel>
              </Collapse>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Project Tractian ©2020 Created by Claudio Pimentel
      </Footer>
    </Layout>
  );
}
