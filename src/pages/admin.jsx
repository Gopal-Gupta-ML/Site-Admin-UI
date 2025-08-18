import React from "react";
import { Layout, Button, Tabs, Table, Row, Col } from "antd";
import './admin.css'
const { Header, Content } = Layout;
const { TabPane } = Tabs;

const AdminScreen = () => {
  // Mock Data for Users
  const userColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  const userData = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  // Mock Data for Roles
  const roleColumns = [
    { title: "Role ID", dataIndex: "id", key: "id" },
    { title: "Role Name", dataIndex: "role", key: "role" },
  ];

  const roleData = [
    { id: 1, role: "Admin" },
    { id: 2, role: "Editor" },
    { id: 3, role: "Viewer" },
  ];

  // Mock Data for Groups
  const groupColumns = [
    { title: "Group ID", dataIndex: "id", key: "id" },
    { title: "Group Name", dataIndex: "group", key: "group" },
  ];

  const groupData = [
    { id: 1, group: "HR" },
    { id: 2, group: "Engineering" },
    { id: 3, group: "Sales" },
  ];

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add logout logic here
  };

  const renderTableWithHeader = (title, columns, data, buttonText) => (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col>
          <h3 style={{ margin: 0 }}>{title}</h3>
        </Col>
        <Col>
          <Button type="primary" style={{width:"160px"}}>{buttonText}</Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </>
  );

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "white" }}>
      <Header
        style={{
          backgroundColor: "black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <h2 style={{ color: "white", margin: 0 }}>Admin Panel</h2>
        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      </Header>

      <Content style={{ margin: "20px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Users" key="1">
            {renderTableWithHeader("Users", userColumns, userData, "+ Create New User")}
          </TabPane>
          <TabPane tab="Roles" key="2">
            {renderTableWithHeader("Roles", roleColumns, roleData, "+ Create Role")}
          </TabPane>
          <TabPane tab="Groups" key="3">
            {renderTableWithHeader("Groups", groupColumns, groupData, "+ Create Group")}
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default AdminScreen;
