import { TabBar } from "antd-mobile";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBillList } from "@/store/modules/billStore";
import "./index.scss";
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline,
} from "antd-mobile-icons";

const tabs = [
  {
    key: "/month",
    title: "Monthly",
    icon: <BillOutline />,
  },
  {
    key: "/new",
    title: "New",
    icon: <AddCircleOutline />,
  },
  {
    key: "/year",
    title: "Yearly",
    icon: <CalculatorOutline />,
  },
];

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);
  const navigate = useNavigate();
  const switchRoute = (path) => {
    navigate(path);
  };

  return (
    <div className="layout">
      <div className="container">
        <Outlet />
      </div>
      <div className="footer">
        <TabBar onChange={switchRoute}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};

export default Layout;
