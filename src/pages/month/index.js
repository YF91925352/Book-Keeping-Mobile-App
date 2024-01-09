import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import DailyBill from "./components/day-bill";

const Month = () => {
  /* 按月做数据分组 */
  const billList = useSelector((state) => state.bill.billList);
  const [currentMonthList, setCurrentMonthList] = useState([]);
  const [dataVisible, setDataVisible] = useState(false);
  /* 时间格式化为xxxx年x月,用dayjs */
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });

  const monthGroup = useMemo(() => {
    /* return 出去计算后的值 */ return _.groupBy(billList, (item) =>
      dayjs(item.date).format("YYYY-MM")
    );
  }, [billList]);

  /* 当前月按照日期分类 */
  const dayGroup = useMemo(() => {
    /* return 出去计算后的值 */
    const groupData = _.groupBy(currentMonthList, (item) =>
      dayjs(item.date).format("YYYY-MM-DD")
    );
    const keys = Object.keys(groupData);
    return { groupData, keys };
  }, [currentMonthList]);

  const onConfirm = (date) => {
    const formatDate = dayjs(date).format("YYYY-MM");
    setCurrentDate(formatDate);
    setDataVisible(false);
    if (monthGroup[formatDate]) {
      setCurrentMonthList(monthGroup[formatDate]);
    } else {
      setCurrentMonthList([]);
    }
  };

  useEffect(() => {
    const nowDate = dayjs(new Date()).format("YYYY-MM");
    if (monthGroup[nowDate]) {
      setCurrentMonthList(monthGroup[nowDate]);
    }
  }, [monthGroup]);

  const monthResult = useMemo(() => {
    // Check if currentMonthList is not an empty array
    if (Array.isArray(currentMonthList) && currentMonthList.length > 0) {
      const pay = currentMonthList
        .filter((item) => item.type === "pay")
        .reduce((a, c) => a + c.money, 0);

      const income = currentMonthList
        .filter((item) => item.type === "income")
        .reduce((a, c) => a + c.money, 0);

      return { pay, income, total: pay + income };
    } else {
      // Handle the case when currentMonthList is empty
      return { pay: 0, income: 0, total: 0 };
    }
  }, [currentMonthList]);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        Monthly Finances
      </NavBar>
      <div className="content">
        <div className="header">
          {/* Date switching area */}
          <div className="date" onClick={() => setDataVisible(true)}>
            {/* 不能直接{currentDate},react不允许直接渲染对象，加“”转换为字符串*/}
            <span className="text"> {currentDate + ""} Bill</span>
            <span
              className={classNames("arrow", dataVisible && "expand")}
            ></span>
          </div>
          {/* Statistics area */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay}</span>
              <span className="type">Expenses</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income}</span>
              <span className="type">Income</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total}</span>
              <span className="type">Balance</span>
            </div>
          </div>
          {/* Date picker */}
          <DatePicker
            className="kaDate"
            title="Choose Date"
            precision="month"
            visible={dataVisible}
            max={new Date()}
            onClose={() => setDataVisible(false)}
            onConfirm={onConfirm}
            onCancel={() => setDataVisible(false)}
          />
        </div>
        {/* 单日列表统计 */}
        {dayGroup.keys.map((key) => {
          return (
            <DailyBill
              key={key}
              date={key}
              billList={dayGroup.groupData[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Month;
