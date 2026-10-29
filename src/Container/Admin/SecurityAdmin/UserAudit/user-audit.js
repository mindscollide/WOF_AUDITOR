import React, { useState, useEffect } from "react";
import { Typography, Space, Row, Col } from "antd";
import {
  DownloadOutlined,
  SearchOutlined as Search,
  EditOutlined as Edit,
  UndoOutlined as Restore,
  PlusOutlined as AddIcon,
} from "@ant-design/icons";
import {
  removeDashesFromDate,
  DateDisplayFormat,
  DateSendingFormat,
  removeDashesFromDate2,
} from "../../../../Common/Functions/date-formatter";
import {
  SelectBox,
  Button,
  Table,
  Modal,
  StartToEndDate,
  Loader,
  TextField,
  Notification,
} from "../../../../Components/Elements";

import { securityAdminActivityReport } from "../../../../store/actions/reports_actions"
// import { userAuditActivityReport } from "../../../../store/actions/reports_actions";
import { useDispatch, useSelector } from "react-redux";

const UserAudit = () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.reports);
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [StatusValue, setStatusValue] = useState();
  const [roleValue, setRoleValue] = useState();
  const [status, setStatus] = useState([
    "Enabled",
    "Disabled",
    "Locked",
    "Closed",
  ]);
  const [role, setRole] = useState([
    "System Admin",
    "Security Admin",
    "Data Entry",
    "Manager",
    "Auditor",
  ]);
  const [State, setState] = useState({
    DateFrom: "",
    DateTO: "",
    UserLDAPAccount: "",
    SecurityAdminLDAPAccount: "",
    StatusID: 0,
    RoleID: 0,
  });
  //   for Date
  const [clearDateSelect, setDateClearSelect] = useState("");
  const setDate = (e, val) =>{
    console.log()
    if (e.name && e.name === "dater" && e.startDate!==null && e.endDate!==null) {
      setState({ ...State, 
        DateTO  : DateSendingFormat(e.startDate), 
        DateFrom:DateSendingFormat(e.endDate)});
   }
   else{
    setState({ ...State, 
      DateFrom: "", 
      DateTO:""});
   }
  }
  // const setDate = (arg) => {
  //   var startDate = removeDashesFromDate(arg.startDate);
  //   var endDate = removeDashesFromDate(arg.endDate);
  //   console.log("h", startDate);
  //   console.log("h", endDate);
  //   setState({
  //     ...State,
  //     DateFrom: startDate,
  //     DateTO: endDate,
  //   });
  // };
  // reset All data
  const resetData = () => {
    setState({
      DateFrom: "",
      DateTO: "",
      UserLDAPAccount: "",
      SecurityAdminLDAPAccount: "",
      StatusID: 0,
      RoleID: 0,
    });
    setStatusValue();
    setRoleValue();
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleChange = (e) => {
    setState({
      ...State,
      [e.target.name]: e.target.value,
    });
  };
  const handleForStatus = (e, value) => {
    if (value === "Enabled") {
      setState({
        ...State,
        ["StatusID"]: 1,
      });
      setStatusValue(value);
    } else if (value === "Disabled") {
      setState({
        ...State,
        ["StatusID"]: 2,
      });
      setStatusValue(value);
    } else if (value === "Locked") {
      setState({
        ...State,
        ["StatusID"]: 3,
      });
      setStatusValue(value);
    } else {
      setState({
        ...State,
        ["StatusID"]: 4,
      });
      setStatusValue(value);
    }
  };
  const handleForRole = (e, value) => {
    if (value === "System Admin") {
      setState({
        ...State,
        ["RoleID"]: 2,
      });
      setRoleValue(value);
    } else if (value === "Security Admin") {
      setState({
        ...State,
        ["RoleID"]: 1,
      });
      setRoleValue(value);
    } else if (value === "Data Entry") {
      setState({
        ...State,
        ["RoleID"]: 4,
      });
      setRoleValue(value);
    } else if (value === "Manager") {
      setState({
        ...State,
        ["RoleID"]: 3,
      });
      setRoleValue(value);
    } else {
      setState({
        ...State,
        ["RoleID"]: 5,
      });
      setRoleValue(value);
    }
  };
  console.log(State);
  return (
    <>
      <Title level={3}>Security Administrator Activity</Title>
      <Row gutter={8}>
        <Col lg={6} md={6} sm={24}>
          <TextField
            name="UserLDAPAccount"
            fullWidth
            label="Action on User"
            size="small"
            change={handleChange}
            value={State.UserLDAPAccount}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            name="SecurityAdminLDAPAccount"
            fullWidth
            label="Action By"
            size="small"
            change={handleChange}
            value={State.SecurityAdminLDAPAccount}
          />
        </Col>
        {/* <Col lg={4} md={4} sm={24}>
          <SelectBox
            label="StatusID"
            change={handleForStatus}
            option={status}
            value={StatusValue}
            propertyName={"Fullname"}
          />
        </Col> */}
        {/* <Col lg={4} md={4} sm={24}>
          <SelectBox
            label="RoleID"
            change={handleForRole}
            option={role}
            value={roleValue}
            propertyName={"Fullname"}
          />
        </Col> */}

        <Col lg={12} md={12} sm={24}>
          <StartToEndDate
            // change={datehandler}
            label={"Date Range"}
            width="100%!important"
            size="large"
            change={setDate}
            
            key={clearDateSelect}

            endvalue ={State.DateFrom!==null && State.DateFrom!==""? DateDisplayFormat(State.DateFrom):null}
            startvalue={State.DateTO!==null && State.DateTO!=="" ?DateDisplayFormat(State.DateTO):null}
            DateRange={true}
          />
        </Col>
        <div style={{ marginTop: "6%" }} />
        <Col lg={6} md={6}></Col>
        <Col lg={6} md={6} sm={24} align="right">
          {/* <Space> */}
            <Button
              text="Download Report"
              icon={<DownloadOutlined />}
              applyClass="btnDarkSolid1"
              size="small"
              click={() => dispatch(securityAdminActivityReport(State))}
              ghost
            />
          {/* </Space> */}
        </Col>
        <Col md={4} lg={4} sm={24} align="left">
          {/* <Space> */}
            {/* <Button
              text="Search"
              icon={<Search />}
              applyClass="btnDarkSolid"
              size="small"
              // click={()=>dispatch(SearchApprovalFlow(State.ApprovalFlowName,State.ApprovalFlowDescription))}
            /> */}
            <Button
              text="Reset"
              icon={<Restore />}
              applyClass="btnSecondarySolidResetFull"
              size="small"
              click={resetData}
            />
          {/* </Space> */}
        </Col>
        {/* <Col style={{ marginTop: "1%" }} lg={24} md={22} sm={24}>
          <Title level={3}>User Status</Title>
        </Col> */}
        {/* <Col lg={6} md={6} sm={24}>
          <Button
            text="Access Details"
            icon={<DownloadOutlined />}
            applyClass="btnDarkSolid"
            size="small"
            click={() => dispatch(downloadAccessDetailReport(State))}
            ghost
          />
        </Col> */}
        {/* <Col lg={24} md={24} sm={24} align="center">
          <Space>
            <Button
              text="Download User Status"
              icon={<DownloadOutlined />}
              applyClass="btnDarkSolid"
              size="small"
              click={() => dispatch(securityAdminActivityReport(State))}
              ghost
            />
          </Space>
        </Col> */}
        {/* <Col lg={6} md={6} sm={24}>
          <Button
            text="Login History"
            icon={<DownloadOutlined />}
            applyClass="btnDarkSolid"
            size="small"
            click={() => dispatch(downloadLoginHistoryReport(State))}
            ghost
          />
        </Col> */}
        {/* <Col lg={6} md={6} sm={24}>
          <Button
            text="Status Wise"
            icon={<DownloadOutlined />}
            applyClass="btnDarkSolid"
            size="small"
            click={() => dispatch(downloadStatusWiseReport(State))}
            ghost
          />
        </Col> */}
        {/* <Col lg={6} md={6} sm={24}>
          <Button
            text="Last Login"
            icon={<DownloadOutlined />}
            applyClass="btnDarkSolid"
            size="small"
            click={() => dispatch(lastLoginReport(State))}
            ghost
          />
        </Col> */}
      </Row>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {reports.isLoading && <Loader />}
    </>
  );
};

export default UserAudit;
