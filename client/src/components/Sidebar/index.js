import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import api from "../../service/api";
import { Select, Form } from "antd";
import { PieChartOutlined,
  BookOutlined,
  UserAddOutlined,
  ProfileOutlined,
  HomeOutlined, } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import '../../styles/select.css'


const { Sider } = Layout
const { SubMenu } = Menu

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const history = useHistory()

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }
  const handleCreateCompany = () => {
    history.push('/create-company')
  }

  const handleCreateUnity = () => {
    history.push('/create-unity')
  }

  const handleCreateAsset = () => {
    history.push('/create-asset')
  }

  const handleCreateResponsible = () => {
    history.push('/create-responsible')
  }

  const handleUpdateCompany = () => {
    history.push('/update-company')
  }

  const handleUpdateUnity = () => {
    history.push('/update-unity')
  }

  const handleUpdateAsset  = () => {
    history.push('/update-asset')
  }

  const handleUpdateResponsible  = () => {
    history.push('/update-responsible')
  }

  const handleDeleteCompany  = () => {
    history.push('/delete-company')
  }

  const handleDeleteUnity  = () => {
    history.push('/delete-unity')
  }

  const handleDeleteResponsable = () => {
    history.push('/delete-responsible')
  }

  const handleDeleteAsset  = () => {
    history.push('/delete-asset')
  }

  const handleIndex = () => {
    history.push('/')
  }

  const [listNamesCompany, setListNamesCompany] = useState([]);
  
  const [persistedCompanyId, setPersistedCompanyId] = useState('')
  
  useEffect(() => {
    api.get("companies").then((response) => {
      persistCompanyId();
      setListNamesCompany(response.data.companies);
    });
  }, []);
  
  function persistCompanyId() {
    const id = window.localStorage.getItem('company_id');
    id && setPersistedCompanyId(id);
  }
  
  function saveCompanyId(id) {
    window.localStorage.setItem('company_id', id)

      setTimeout(() => {
        window.location.href = '/'
      }, 1000)

  }
  
  
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />

      <Form
      {...layout}
      name="company-main"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item className="select-main">
        <h4 style={{color: "white", textAlign: "center" }}>Empresa Atual</h4>
      {persistedCompanyId && <Select  defaultValue={persistedCompanyId} onChange={saveCompanyId}>
        {listNamesCompany.map((val) => {
          return (
            <Select.Option key={val._id} value={val._id}>
              {" "}
              {val.name}{" "}
            </Select.Option>
          );
        })}
      </Select>}
        </Form.Item>

    </Form>

      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item onClick={handleIndex} key="1" icon={<PieChartOutlined />}>
          Visão Geral
        </Menu.Item>
        <SubMenu key="sub1" icon={<BookOutlined />} title="Empresas">
          <Menu.Item key="1" onClick={handleCreateCompany}> Adicionar </Menu.Item>
          <Menu.Item key="2" onClick={handleUpdateCompany}>Editar</Menu.Item>
          <Menu.Item key="3" onClick={handleDeleteCompany}>Excluir</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<HomeOutlined />} title="Unidades">
          <Menu.Item key="4" onClick={handleCreateUnity}>Adicionar</Menu.Item>
          <Menu.Item key="5" onClick={handleUpdateUnity}>Editar</Menu.Item>
          <Menu.Item key="6" onClick={handleDeleteUnity}>Excluir</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<ProfileOutlined />} title="Ativos">
          <Menu.Item key="7" onClick={handleCreateAsset}>Adicionar</Menu.Item>
          <Menu.Item key="8" onClick={handleUpdateAsset}>Editar</Menu.Item>
          <Menu.Item key="9" onClick={handleDeleteAsset}>Excluir</Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<UserAddOutlined />} title="Responsáveis">
          <Menu.Item key="10" onClick={handleCreateResponsible}>Adicionar</Menu.Item>
          <Menu.Item key="11" onClick={handleUpdateResponsible}>Editar</Menu.Item>
          <Menu.Item key="12" onClick={handleDeleteResponsable}>Excluir</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}
