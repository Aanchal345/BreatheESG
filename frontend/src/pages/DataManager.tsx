import React, { useState } from "react";
import { Badge, Button, Select, Table, Tabs, Tag } from "antd";
import {
  ShareAltOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  FileSearchOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";

const { TabPane } = Tabs;
const { Option } = Select;

const columns = [
  {
    title: "ASSESSMENT TITLE",
    dataIndex: "assessmentTitle",
    key: "assessmentTitle",
  },
  {
    title: "TYPE",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "NO. OF SUPPLIERS",
    dataIndex: "numSuppliers",
    key: "numSuppliers",
  },
  {
    title: "SCORE",
    dataIndex: "score",
    key: "score",
  },
  {
    title: "RISK CLASSIFICATION",
    dataIndex: "riskClassification",
    key: "riskClassification",
    render: (text: any) => {
      let color = "green";
      if (text === "Medium") {
        color = "yellow";
      } else if (text === "High") {
        color = "red";
      }
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (text: any) => (
      <Tag color={text === "PENDING" ? "orange" : "green"}>{text}</Tag>
    ),
  },
  {
    title: "RESULT",
    dataIndex: "result",
    key: "result",
  },
  {
    title: "ACTIONS",
    key: "actions",
    render: () => (
      <div>
        <span style={{ marginRight: "10px" }}>
          <ShareAltOutlined />
        </span>
        <span>
          <DeleteOutlined />
        </span>
      </div>
    ),
  },
];
const trackerData = [
  {
    month: "Jan 2023",
    status: "PENDING APPROVAL (1/12)",
    completion: "20%",
    businessUnit: "Business Unit 1",
  },
  {
    month: "Feb 2023",
    status: "APPROVED (2/12)",
    completion: "30%",
    businessUnit: "Business Unit 1",
  },
  {
    month: "Mar 2023",
    status: "INCOMPLETE (4/12)",
    completion: "50%",
    businessUnit: "Business Unit 1",
  },
];

const TrackerView = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          margin: "30px 0 30px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            height: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              border: "1px solid #f0f0f0",
              padding: "10px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ marginRight: "16px", fontWeight: "bold" }}>
                PENDING TRACKERS
              </span>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginLeft: "8px",
                }}
              >
                45/60
              </h1>
            </div>
            <ClockCircleOutlined style={{ marginRight: "8px" }} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            height: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              border: "1px solid #f0f0f0",
              padding: "10px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ marginRight: "16px", fontWeight: "bold" }}>
                REVIEWS
              </span>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginLeft: "8px",
                }}
              >
                3
              </h1>
            </div>
            <FileSearchOutlined style={{ marginRight: "8px" }} />
          </div>
        </div>
      </div>

      <Table
        dataSource={trackerData}
        columns={[
          { title: "MONTH", dataIndex: "month", key: "month" },
          {
            title: "STATUS",
            dataIndex: "status",
            key: "status",
            render: (text) => {
              let color = "green";
              if (text.includes("PENDING APPROVAL")) {
                color = "red";
              } else if (text.includes("INCOMPLETE")) {
                color = "orange";
              }
              return <Tag color={color}>{text}</Tag>;
            },
          },
          { title: "COMPLETION", dataIndex: "completion", key: "completion" },
          {
            title: "BUSINESS UNIT",
            dataIndex: "businessUnit",
            key: "businessUnit",
          },
        ]}
      />
    </div>
  );
};

const data = [
  {
    key: "1",
    assessmentTitle: "Assessment 1",
    type: "BRSR",
    numSuppliers: 20,
    score: "-",
    riskClassification: "Medium",
    status: "PENDING",
    result: "-",
  },
  {
    key: "2",
    assessmentTitle: "Assessment 2",
    type: "BRSR",
    numSuppliers: 25,
    score: 98,
    riskClassification: "Low",
    status: "COMPLETE",
    result: "View",
  },
  {
    key: "3",
    assessmentTitle: "Assessment 3",
    type: "BRSR",
    numSuppliers: 35,
    score: 22,
    riskClassification: "High",
    status: "COMPLETE",
    result: "View",
  },
  {
    key: "4",
    assessmentTitle: "Assessment 3",
    type: "Custom",
    numSuppliers: 49,
    score: 23,
    riskClassification: "Medium",
    status: "COMPLETE",
    result: "View",
  },
  {
    key: "5",
    assessmentTitle: "Assessment 3",
    type: "Custom",
    numSuppliers: 100,
    score: 42,
    riskClassification: "Medium",
    status: "COMPLETE",
    result: "View",
  },
];
const DataManager = () => {
  const [activeTab, setActiveTab] = useState("dataEntry");
  const [selectedYear, setSelectedYear] = useState("FY 2023-24");

  const handleTabChange = (key: any) => {
    setActiveTab(key);
  };

  const handleYearChange = (value: any) => {
    setSelectedYear(value);
  };

  const exportToExcel = (data: any, fileName: any) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
    XLSX.writeFile(workbook, "results.xlsx");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div style={{ width: "20%" }}>
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="DATA ENTRY" key="dataEntry" />
            <TabPane tab="TRACKER" key="tracker" />
          </Tabs>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
          style={{backgroundColor: "#1fd655", color: "white"}}
            icon={<DownloadOutlined />}
            onClick={() =>
              exportToExcel(
                activeTab === "dataEntry" ? data : trackerData,
                `${activeTab}_data`
              )
            }
          >
            Excel
          </Button>

          <span style={{ marginRight: "8px", marginLeft: "16px" }}>For:</span>
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            style={{ width: "120px" }}
          >
            <Option value="FY 2023-24">FY 2023-24</Option>
            <Option value="FY 2022-23">FY 2022-23</Option>
            <Option value="FY 2021-22">FY 2021-22</Option>
          </Select>

          {activeTab === "dataEntry" && (
            <Button
              type="primary"
              style={{ backgroundColor: "#1fd655", marginLeft: "16px" }}
            >
              Submit for Approval
            </Button>
          )}
        </div>
      </div>
      {activeTab === "tracker" && <TrackerView />}
      {activeTab === "dataEntry" && (
        <Table columns={columns} dataSource={data} />
      )}
    </div>
  );
};

export default DataManager;
