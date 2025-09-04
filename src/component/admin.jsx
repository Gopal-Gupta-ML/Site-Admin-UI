import React, { useEffect, useState } from "react";
import { Layout, Button, Tabs, Table, Row, Col, Tag } from "antd";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import { fetchGroups, fetchRoles, fetchUsers, logout } from "../api/service";
import dayjs from "dayjs";

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const AdminScreen = () => {

  const navigate = useNavigate();
  const [groupData, setGroupData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [userData, setUserData] = useState([]);
const [loading, setLoading] = useState(false);
const [pagination, setPagination] = useState({
  current: 1,    // default to first page
  pageSize: 5,   // default page size
  total: 0,      // will be updated after API response
});
  useEffect(() => {
    if (!localStorage.getItem("Session_Code")) {
      navigate("/login");
    }
    fetchData(pagination.current, pagination.pageSize);
  }, []);

  const fetchData = async (page, pageSize) => {
    setLoading(true);
    // Groups
    const groupResponse = await fetchGroups();
    const formattedGroups = groupResponse.data?.map((group, index) => ({
      key: `group-${index}`,
      displayName: group.displayName,
      description: group.description,
      groupType: group.groupType,
    }));
    setGroupData(formattedGroups);

    // Roles
    const roleResponse = await fetchRoles();
    const formattedRoles = roleResponse.data?.map((role, index) => ({
      key: `role-${index}`,
      roleId: index + 1,
      roleName: role,
    }));
    setRoleData(formattedRoles);

    // Users
    const userResponse = await fetchUsers(page , pageSize);
    const formattedUsers = userResponse.users?.map((user, index) => ({
      key: `user-${index}`,
      userId: index + 1,
      displayName: user.displayName,
      roles: user.roles || [],
      groups: user.groups || [],
      createdDateTime: user.createdDateTime,
    }));

    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize,
      total: userResponse.totalElements,
    }));
    setLoading(false);
    setUserData(formattedUsers);
  };

  const handleAssign = (record) => {
    console.log("Assign clicked for:", record);
  };

  // User table columns
  const userColumns = [
    { title: "User ID", dataIndex: "userId", key: "userId", width: 80 },
    { title: "Display Name", dataIndex: "displayName", key: "displayName" },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles) =>
        roles?.length
          ? roles.map((r, idx) => (
              <Tag color="blue" key={`${r}-${idx}`}>
                {r}
              </Tag>
            ))
          : "—",
    },
    {
      title: "Groups",
      dataIndex: "groups",
      key: "groups",
      render: (groups) =>
        groups?.length
          ? groups.map((g, idx) => (
              <Tag color="green" key={`${g}-${idx}`}>
                {typeof g === "string" ? g : g.displayName || "Unknown"}
              </Tag>
            ))
          : "—",
    },
    {
      title: "Created DateTime",
      dataIndex: "createdDateTime",
      key: "createdDateTime",
      render: (date) => (date ? dayjs(date).format("YYYY-MM-DD HH:mm") : "—"),
    },
  ];

  // Role table columns
  const roleColumns = [
    { title: "Role ID", dataIndex: "roleId", key: "roleId" },
    { title: "Role Name", dataIndex: "roleName", key: "roleName" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleAssign(record)} disabled={true}>
          Assign
        </Button>
      ),
    },
  ];

  // Group table columns
  const groupColumns = [
    { title: "Display Name", dataIndex: "displayName", key: "displayName" },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => text || "N/A",
    },
    { title: "Group Type", dataIndex: "groupType", key: "groupType" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleAssign(record)} disabled={true}>
          Assign
        </Button>
      ),
    },
  ];

  const handleLogout = async() => {
     const response = await logout()
    navigate("/login");
    localStorage.clear();
  };

  const renderTableWithHeader = (title, columns, data, buttonText) => (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col>
          <h3 style={{ margin: 0 }}>{title}</h3>
        </Col>
        <Col>
          <Button type="primary" style={{ width: "160px" }} disabled={true}>
            {buttonText}
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} loading={loading}  pagination={{
    current: pagination.current,
    pageSize: pagination.pageSize,
    total: pagination.total,
    showSizeChanger: true, // allows user to change page size
  }}
  onChange={(newPagination) => {
    fetchData(newPagination.current, newPagination.pageSize);
  }}  />
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
          LogOut
        </Button>
      </Header>

      <Content
        style={{
          margin: "20px",
          background: "white",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
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
