import { DatePicker, NavBar } from "antd-mobile";
import classNames from "classnames";
import dayjs from "dayjs";
import "./index.scss";
import { useDate } from "@/hooks/useDate";
import { useYearBillList } from "@/hooks/useBillList";
import { getMonthOverview, getOverview } from "@/contant/billList";
import TwoLineOverview from "@/components/TwoLineOverview";
import OneLineOverview from "@/components/OneLineOverview";

const Year = () => {
  const { date, visible, onDateChange, onShowDate, onHideDate } = useDate();

  const selectedYear = date.get("year");
  const selectedYearBills = useYearBillList(selectedYear);

  const overview = getOverview(selectedYearBills);
  const thisYear = dayjs().get("year");
  const maxMonth = thisYear === selectedYear ? dayjs().get("month") + 1 : 12;

  const monthBillList = new Array(maxMonth)
    .fill("")
    .map((_, month) => {
      return getMonthOverview(selectedYearBills, month);
    })
    .reverse();

  const monthIndexToName = (index) => {
    // Using the toLocaleString method
    const monthName = new Date(2023, index).toLocaleString("en-US", {
      month: "long",
    });

    // Returning the result
    return monthName; //
  };

  return (
    <div className="billDetail">
      <NavBar className="nav" backArrow={false}>
        <div className="nav-title" onClick={onShowDate}>
          {selectedYear}
          <span className={classNames("arrow", visible && "expand")}></span>
        </div>
      </NavBar>
      <DatePicker
        className="kaDate"
        title="Accounting Year"
        precision="year"
        visible={visible}
        onClose={onHideDate}
        max={new Date()}
        onConfirm={onDateChange}
      />

      <div className="content">
        <div className="overview">
          <TwoLineOverview
            pay={overview.pay}
            income={overview.income}
            className="overview"
          />
        </div>
        {monthBillList.map((item, index) => {
          return (
            <div className="monthBill" key={index}>
              <div className="date">
                {monthIndexToName(maxMonth - index - 1)}
              </div>
              <OneLineOverview pay={item.pay} income={item.income} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Year;
