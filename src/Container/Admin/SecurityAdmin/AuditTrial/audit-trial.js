import React, { useState, useEffect } from "react";
import { Typography, Space, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getAuditActionList } from "../../../../store/actions/reports_actions";
import { DownloadOutlined } from "@ant-design/icons";
import { userAuditActivityReport } from "../../../../store/actions/reports_actions";

import {
  TextField,
  SelectBox,
  Button,
  StartToEndDate,
  Table,
  Modal,
  Loader,
  GridDataView,
} from "../../../../Components/Elements";
import {
  removeDashesFromDate,
  DateDisplayFormat,
  DateSendingFormat,
  removeDashesFromDate2,
} from "../../../../Common/Functions/date-formatter";
const AuditTrial = () => {
  const { Title } = Typography;
  const reports = useSelector((state) => state.reports);
  const dispatch = useDispatch();
  const [actions, setAction] = useState({
    add: false,
    delete: false,
    addRole: false,
    modalDelete: false,
  });
  const [actionsList, setActionList] = useState([]);
  const [actionsvalue, setActionsvalue] = useState("");
  const [State, setState] = useState({
    DateFrom: "",
    DateTO: "",
    LDAPAccount: "",
    MisysCode: "",
    WOFCode: "",
    NPLCode: "",
    ActionID: 0,
  });
  const add = () => {
    showModal();
    setAction({ ...actions, add: !actions.add });
  };
  const modalDelete = () => {
    showModal();
    setAction({ ...actions, modalDelete: !actions.modalDelete });
  };
  const deleteit = () => {
    showModal();
    setAction({ ...actions, delete: !actions.delete });
  };
  const addRole = () => {
    showModal();
    setAction({ ...actions, addRole: !actions.addRole });
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setAction({
      add: false,
      delete: false,
      addRole: false,
      modalDelete: false,
    });
  };
  const columns = [
    {
      title: "Action By",
      dataIndex: "actionBy",
      key: "actionBy",
      align: "center",
      width: "15%",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text) => <b>{text}</b>,
      align: "center",
      width: "25%",
    },
    {
      title: "Action On",
      dataIndex: "actionOn",
      key: "actionOn",
      width: "15%",
      render: (text) => (
        <>
          <b>{text.date}</b>
          <br />
          <span style={{ color: "#6D6D6D", fontSize: ".875em" }}>
            {text.time}
          </span>
        </>
      ),
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: "90%",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "View Details",
      dataIndex: "viewDetail",
      key: "viewDetail",
      width: "20%",
      render: (text) => (
        <Space onClick={showModal}>
          <i className="icon-edit-list icon-size-one beachGreen"></i>
        </Space>
      ),
      align: "center",
    },
  ];
  const rows = [
    {
      key: "1",
      actionBy: "Yasir Ahmed",
      description:
        "Write Off case created for Pakistan Auto Industries – CG7GSW - 0137238",
      actionOn: { date: "01 Jan, 2021", time: "15:00" },
      action: "Write Off case Created",
      viewDetails: "",
    },
    {
      key: "2",
      actionBy: "Faheemuddin Sufi",
      description:
        "Complete Report Searched for Pakistan Auto Industries – CG7GSW - 0137238",
      actionOn: { date: "01 Jan, 2021", time: "15:00" },
      action: "	Complete Report Searched",
      viewDetails: "",
    },
    {
      key: "4",
      actionBy: "Yasir Ahmed",
      description:
        "Write Off case created for Pakistan Auto Industries – CG7GSW - 0137238",
      actionOn: { date: "01 Jan, 2021", time: "15:00" },
      action: "Write Off case Created",
      viewDetails: "",
    },
    {
      key: "5",
      actionBy: "Yasir Ahmed",
      description:
        "Write Off case created for Pakistan Auto Industries – CG7GSW - 0137238",
      actionOn: { date: "01 Jan, 2021", time: "15:00" },
      action: "Write Off case Created",
      viewDetails: "",
    },
    {
      key: "6",
      actionBy: "Yasir Ahmed",
      description:
        "Write Off case created for Pakistan Auto Industries – CG7GSW - 0137238",
      actionOn: { date: "01 Jan, 2021", time: "15:00" },
      action: "Write Off case Created",
      viewDetails: "",
    },
  ];
  const modalColumns = [
    {
      title: "Account #",
      dataIndex: "account",
      key: "account",
      align: "center",
    },
    {
      title: "Field Name",
      dataIndex: "fieldName",
      key: "fieldName",
      align: "center",
    },
    {
      title: "Previous Value",
      dataIndex: "previousValue",
      key: "previousValue",
      align: "center",
    },
    {
      title: "Updated Value",
      dataIndex: "updatedValue",
      key: "updatedValue",
      align: "center",
    },
  ];
  const modalRows = [
    {
      key: "1",
      account: "25257000356503",
      fieldName: "Financial Relief Allowed >> Principal",
      previousValue: "12,000,000",
      updatedValue: "13,500,000",
    },
    {
      key: "2",
      account: "25257000356503",
      fieldName: "Financial Relief Allowed >> Principal",
      previousValue: "12,000,000",
      updatedValue: "13,500,000",
    },
    {
      key: "4",
      account: "25257000356503",
      fieldName: "Financial Relief Allowed >> Principal",
      previousValue: "12,000,000",
      updatedValue: "13,500,000",
    },
    {
      key: "5",
      account: "25257000356503",
      fieldName: "Financial Relief Allowed >> Principal",
      previousValue: "12,000,000",
      updatedValue: "13,500,000",
    },
    {
      key: "6",
      account: "25257000356503",
      fieldName: "Financial Relief Allowed >> Principal",
      previousValue: "12,000,000",
      updatedValue: "13,500,000",
    },
  ];
  const handleChange = (e) => {
    setState({
      ...State,
      [e.target.name]: e.target.value,
    });
  };
  //   for Date
  const [clearDateSelect, setDateClearSelect] = useState("");
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
  const setDate = (e, val) => {
    console.log();
    if (
      e.name &&
      e.name === "dater" &&
      e.startDate !== null &&
      e.endDate !== null
    ) {
      setState({
        ...State,
        DateTO : DateSendingFormat(e.startDate),
        DateFrom : DateSendingFormat(e.endDate),
      });
    } else {
      setState({ ...State, DateFrom: "", DateTO: "" });
    }
  };
  const resetData = () => {
    setState({
      DateFrom: "",
      DateTO: "",
      LDAPAccount: "",
      MisysCode: "",
      WOFCode: "",
      NPLCode: "",
      ActionID: 0,
    });
    setActionsvalue("")
    // setStatusValue();
    // setRoleValue();
  };

  // For Get Audit Action List
  useEffect(() => {
    dispatch(getAuditActionList());
  }, []);
  // For Action List
  useEffect(() => {
    // var addedKey, data;
    if (reports.actionGrid) {
      let data = reports.actionGrid;
      let actionTitle = data.map((value, index) => {
        return value.title;
      });
      setActionList(actionTitle);
    }
    console.log(reports.actionGrid);
  }, [reports.actionGrid]);
  useEffect(() => {
    console.log(actionsList);
  }, [actionsList]);
  const handleChangeForAction = (e, value) => {
    setActionsvalue(value);
    if (reports.actionGrid) {
      let data = reports.actionGrid;
      let actionTitle = data.map((item, index) => {
        let title = item.title;
        let id = item.id;
        if (title === value) {
          setState({
            ...State,
            ["ActionID"]: id,
          });
        }
      });
      // setActionList (actionTitle)
    }
    // setState({
    //   ...State,
    //   [e.target.name]: e.target.value,
    // });
  };
  console.log(State);
  return (
    <>
      <Title level={3}>Audit Trial</Title>
      <Row gutter={8}>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            name="WOFCode"
            label="WOF Code"
            size="small"
            value={State.WOFCode}
            change={handleChange}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            name="MisysCode"
            label="MISYS Customer Code"
            size="small"
            value={State.MisysCode}
            change={handleChange}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            name="NPLCode"
            label="Borrower NPL Code"
            size="small"
            value={State.NPLCode}
            change={handleChange}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            name="LDAPAccount"
            label="Action By"
            size="small"
            value={State.LDAPAccount}
            change={handleChange}
          />
        </Col>
        <div style={{ marginTop: "5%" }} />
        <Col lg={6} md={6} sm={24}>
          <SelectBox
            label="Select Action"
            size="small"
            height="10px!important"
            option={actionsList}
            value={actionsvalue}
            change={handleChangeForAction}
          />
        </Col>
        <div style={{ marginTop: "5%" }} />
        <Col md={8} lg={8} sm={24}>
          <StartToEndDate
            label="Action on"
            width="400px"
            size="large"
            change={setDate}
            endvalue  ={
              State.DateFrom !== null && State.DateFrom !== ""
                ? DateDisplayFormat(State.DateFrom)
                : null
            }
            startvalue ={
              State.DateTO !== null && State.DateFrom !== ""
                ? DateDisplayFormat(State.DateTO)
                : null
            }
            key={clearDateSelect}
          />
        </Col>

        <Col md={10} lg={10} sm={24}>
          <div className="u-display-flex">
            {/* <Box width={4 / 8}>
              <Button
                applyClass="btnDarkSolid1"
                text="Search"
                icon={<i className="icon-search icon-size-one"></i>}
              />
            </Box> */}
            <div style={{ margin: "0 5px 0 5px" }} />
            <div style={{ width: "50%" }}>
              <Button
                applyClass="btnSecondarySolidResetFull"
                text="Reset"
                icon={<i className="icon-reset icon-size-one"></i>}
                click={resetData}
              />
            </div>
          </div>
        </Col>
        <div style={{ marginTop: "8%" }} />
        <Col lg={24} md={24} sm={24} align="right">
          <Space>
            <Button
              text="Download To Excel"
              icon={<DownloadOutlined />}
              applyClass="btnDarkSolid1"
              size="small"
              click={() => dispatch(userAuditActivityReport(State))}
              ghost
            />
          </Space>
        </Col>
        <div style={{ marginTop: "10%" }} />
        <Col md={24} lg={24} sm={24}>
          {/* <Table
            rows={rows}
            columns={columns}
            pagination={false}
            scroll={{ x: "max-content" }}
          /> */}
        </Col>
      </Row>

      <Modal
        closeModal={handleCancel}
        modalState={isModalVisible}
        width={700}
        modalTitle={<b>Audit Details</b>}
      >
        <GridDataView />

        <Row>
          <Col md={24} lg={24} sm={24}>
            <Table rows={modalRows} columns={modalColumns} pagination={false} />
          </Col>
        </Row>
      </Modal>
      {reports.isLoading && <Loader />}
    </>
  );
};

export default AuditTrial;
