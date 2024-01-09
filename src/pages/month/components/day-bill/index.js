import classNames from "classnames";
import "./index.scss";
import { useMemo, useState } from "react";
import Icon from "@/components/icon";

const DailyBill = ({ date, billList }) => {
  const dayResult = useMemo(() => {
    // Check if billList is not an empty array
    if (Array.isArray(billList) && billList.length > 0) {
      const pay = billList
        .filter((item) => item.type === "pay")
        .reduce((a, c) => a + c.money, 0);

      const income = billList
        .filter((item) => item.type === "income")
        .reduce((a, c) => a + c.money, 0);

      return { pay, income, total: pay + income };
    } else {
      // Handle the case when billList is empty
      return { pay: 0, income: 0, total: 0 };
    }
  }, [billList]);

  const [visible, setVisible] = useState(false);
  return (
    <div className={classNames("dailyBill")}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span
            className={classNames("arrow", visible && "expand")}
            onClick={() => setVisible(!visible)}
          ></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">Expenses: </span>
            <span className="money">{dayResult.pay}</span>
          </div>
          <div className="income">
            <span className="type">Income: </span>
            <span className="money">{dayResult.income}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.total}</span>
            <span className="type">Balance</span>
          </div>
        </div>
      </div>
      <div className="billList" style={{ display: visible ? "block" : "none" }}>
        {billList.map((item) => {
          return (
            <div className="bill" key={item.id}>
              <Icon type={item.useFor} />
              <div className="detail">
                <div className="billType">{item.useFor}</div>
              </div>
              <div className={classNames("money", item.type)}>{item.money}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DailyBill;
