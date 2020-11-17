import React from 'react'
import { Layout } from 'antd'

export default function LayoutWrapper({ children }) {
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>{children}</Layout>
    </div>
  )
}
