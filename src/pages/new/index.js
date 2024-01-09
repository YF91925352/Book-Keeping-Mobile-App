import { Button, DatePicker, Input, NavBar } from "antd-mobile";
import "./index.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/icon";
import { billListData } from "@/contant/billList";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBillList } from "@/store/modules/billStore";
import dayjs from "dayjs";

const New = () => {
  const navigate = useNavigate();
  const [billType, setBillType] = useState("pay");
  const [money, setMoney] = useState(0);
  const [useFor, setUseFor] = useState("");
  const [dateVisible, setDateVisible] = useState(false);
  const [chosenDate, setChosenDate] = useState();
  const dispatch = useDispatch();
  const saveBill = () => {
    const data = {
      type: billType,
      money: billType === "pay" ? -money : money,
      date: chosenDate,
      useFor: useFor,
    };

    dispatch(addBillList(data));
  };
  const dateConfirm = (value) => {
    setChosenDate(value);
    setDateVisible(false);
  };
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        Record a Transaction
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === "pay" ? "selected" : "")}
            onClick={() => setBillType("pay")}
          >
            Expense
          </Button>
          <Button
            className={classNames(billType === "income" ? "selected" : "")}
            shape="rounded"
            onClick={() => setBillType("income")}
          >
            Income
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setDateVisible(true)}>
                {dayjs(chosenDate).format("YYYY-MM-DD")}
              </span>
              <DatePicker
                className="kaDate"
                title="Transaction Date"
                max={new Date()}
                visible={dateVisible}
                onConfirm={dateConfirm}
                onClose={() => setDateVisible(false)}
                onCancel={() => setDateVisible(false)}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={(value) => setMoney(value)}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    <div
                      className={classNames(
                        "item",
                        useFor === item.type ? "selected" : ""
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default New;
