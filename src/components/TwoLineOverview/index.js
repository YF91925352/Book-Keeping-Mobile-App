import classNames from "classnames";

import "./index.scss";

const TwoLineOverview = ({ pay, income }) => {
  return (
    <div className={classNames("twoLineOverview")}>
      <div className="item">
        <span className="money">{Math.abs(pay).toFixed(0)}</span>
        <span className="type">Expense</span>
      </div>
      <div className="item">
        <span className="money">{income.toFixed(0)}</span>
        <span className="type">Income</span>
      </div>
      <div className="item">
        <span className="money">{(income + pay).toFixed(0)}</span>
        <span className="type">Balance</span>
      </div>
    </div>
  );
};

export default TwoLineOverview;
