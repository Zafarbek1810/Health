import React, { useEffect, useRef, useState } from "react";
import TahlillarWrapper from "./style";
import MinLoader from "../../../../../Common/MinLoader";
import OrderProvider from "../../../../../../Data/OrderProvider";
import moment from "moment";
import {
  Badge,
  Input,
  Pagination,
  Popover,
  Radio,
  Space,
  DatePicker,
  Tooltip,
} from "antd";
import FilterIconSvg from "../../../../../Common/Svgs/FilterIconSvg";
import LabaratoryProvider from "../../../../../../Data/LabaratoryProvider";
import { Button } from "@mui/material";
import numberFormat from "../../../../../../utils/numberFormat";
const { Search } = Input;
const { RangePicker } = DatePicker;

const Tahlillar = () => {
  const [loading, setLoading] = useState(false);
  const [labaratorys, setLabaratorys] = useState([]);
  const [analysisStatus, setAnalysisStatus] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [analysiStatusFilter, setAnalysisStatusFilter] = useState(null);
  const [labStatusFilter, setLabStatusFilter] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [dateString, setDateString] = useState(["", ""]);

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;

  const onChangePagination = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  useEffect(() => {
    LabaratoryProvider.getAllLaboratory()
      .then((res) => {
        setLabaratorys(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    const body = {};
    body.keyword = keyword || null;
    body.analysisStatus = analysiStatusFilter || null;
    body.fromDate = dateString[0] || null;
    body.toDate = dateString[1] || null;
    body.pageNum = currentPage;
    body.laboratoryId = labStatusFilter || null;
    body.pageSize = 20;
    OrderProvider.getAllAnalysisStatus(body)
      .then((res) => {
        console.log(res.data);
        setAnalysisStatus(res.data.data);
        setTotalElements(Math.floor(res.data?.recordsTotal / 2));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [keyword, currentPage, analysiStatusFilter, labStatusFilter, dateString]);

  const onSearchOrder = (e) => {
    setKeyword(e.target.value);
  };

  const onChangeAnalysisStatus = (e) => {
    console.log("checked = ", e.target.value);
    setAnalysisStatusFilter(e.target.value);
  };
  const onChangeLabStatus = (e) => {
    console.log("checked = ", e.target.value);
    setLabStatusFilter(e.target.value);
  };

  const downloadExcel = () => {
    const body = {};
    body.keyword = keyword || null;
    body.analysisStatus = analysiStatusFilter || null;
    body.fromDate = dateString[0] || null;
    body.toDate = dateString[1] || null;
    body.pageNum = currentPage;
    body.laboratoryId = labStatusFilter || null;
    body.pageSize = 20;
    OrderProvider.downloadExcel(body)
      .then((res) => {
        console.log(res);
        const blob = new Blob([res.data], {
          type: "application/xlsx",
        });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        //no download
        // link.target = "_blank";
        // link.click();

        link.download = `${currentDate}.xlsx`;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const content = (
    <div>
      <Radio.Group
        onChange={onChangeAnalysisStatus}
        value={analysiStatusFilter}
      >
        <Space direction="vertical">
          <Radio value={null}>Barchasi</Radio>
          <Radio value={11}>Navbatda</Radio>
          <Radio value={21}>Natija kutilmoqda</Radio>
          <Radio value={31}>Rad etilgan</Radio>
          <Radio value={41}>Natija chiqdi</Radio>
          <Radio value={51}>Bekor qilingan</Radio>
        </Space>
      </Radio.Group>
    </div>
  );

  const content2 = (
    <div>
      <Radio.Group onChange={onChangeLabStatus} value={labStatusFilter}>
        <Space direction="vertical">
          <Radio value={null}>Barchasi</Radio>
          {labaratorys.map((item) => (
            <Radio key={item.id} value={item.id}>
              {item.name}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );

  return (
    <TahlillarWrapper>
      <div className="top">
        <h3 className="col-3">Tahlillar</h3>
        <Tooltip title="Qidirish">
          <Search
            placeholder="Qidirish"
            classNames="col-4"
            allowClear
            enterButton="Qidirish"
            className="col-4"
            size="large"
            onChange={onSearchOrder}
          />
        </Tooltip>
        <div className="col-3 d-flex">
          <Tooltip title="Excel yuklash">
            <Button onClick={() => downloadExcel()}>
              <img src="/images/excelicon.png" alt="xls" />
            </Button>
          </Tooltip>
          <Tooltip title="Sana bo'yicha filter">
            <RangePicker
              onChange={(date, dateString) => {
                setDateString(dateString);
                console.log(dateString);
              }}
            />
          </Tooltip>
        </div>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th style={{ minWidth: "15%" }} className="col">
              Ismi Familyasi
            </th>
            <th style={{ minWidth: "27%" }} className="col">
              Analiz Nomi
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Labaratoriya nomi
              <Popover
                className="pop"
                content={content2}
                title="Filterlash"
                trigger="click"
              >
                <button style={{ background: "transparent", border: "none" }}>
                  <FilterIconSvg />
                </button>
              </Popover>
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Yaratilgan sana
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Natija chiqqan sana
            </th>
            {/* <th style={{ minWidth: "10%" }} className="col">
              Telefon raqam
            </th> */}
            <th style={{ minWidth: "15%" }} className="col">
              Natija holati
              <Popover
                className="pop"
                content={content}
                title="Filterlash"
                trigger="click"
              >
                <button style={{ background: "transparent", border: "none" }}>
                  <FilterIconSvg />
                </button>
              </Popover>
            </th>
            <th style={{ minWidth: "8%" }} className="col">
              Narxi
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            analysisStatus?.length ? (
              analysisStatus?.map((obj, index) => (
                <tr key={index}>
                  <td style={{ minWidth: "15%" }} className="col">
                    {index + (currentPage - 1) * 20 + 1}.{obj.firstName}{" "}
                    {obj.lastName}
                  </td>
                  <td style={{ minWidth: "27%" }} className="col">
                    {obj.analysisName}
                  </td>
                  <td style={{ minWidth: "15%" }} className="col">
                    {obj.laboratoryName}
                  </td>
                  <td style={{ minWidth: "10%" }} className="col">
                    {moment(new Date(obj.createdAt)).format("DD.MM.YYYY HH:mm")}
                  </td>
                  <td style={{ minWidth: "10%" }} className="col">
                    {obj.resultTime === null
                      ? ""
                      : moment(new Date(obj.resultTime)).format(
                          "DD.MM.YYYY HH:mm"
                        )}
                  </td>
                  {/* <td style={{ minWidth: "10%" }} className="col">
                    {obj.phoneNumber}
                  </td> */}
                  <td style={{ minWidth: "15%" }} className="col-badge">
                    {obj.analysisStatus === 11 ? (
                      <span>
                        <Badge status="processing" className="badge_default" />{" "}
                        Navbatda
                      </span>
                    ) : obj.analysisStatus === 21 ? (
                      <span>
                        <Badge status="processing" className="badge_primary" />{" "}
                        Natija kutilmoqda
                      </span>
                    ) : obj.analysisStatus === 31 ? (
                      <span>
                        <Badge status="processing" className="badge_danger" />{" "}
                        Rad etilgan
                      </span>
                    ) : obj.analysisStatus === 41 ? (
                      <span>
                        <Badge status="processing" className="badge_success" />{" "}
                        Natija chiqdi
                      </span>
                    ) : obj.analysisStatus === 51 ? (
                      <span>
                        <Badge status="processing" className="badge_warning" />{" "}
                        Bekor qilingan
                      </span>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td style={{ minWidth: "8%", justifyContent:'end' }} className="col">
                    {numberFormat(obj.discountedPrice)}
                  </td>
                </tr>
              ))
            ) : (
              <h3 style={{ textAlign: "center", margin: "20px 0" }}>
                Mavjud emas
              </h3>
            )
          ) : (
            <MinLoader />
          )}
        </tbody>
      </table>

      <Pagination
        style={{ textAlign: "right" }}
        defaultCurrent={currentPage}
        current={currentPage}
        total={totalElements}
        onChange={onChangePagination}
      />
    </TahlillarWrapper>
  );
};

export default Tahlillar;
