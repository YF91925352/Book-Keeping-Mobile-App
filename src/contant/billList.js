import dayjs from "dayjs";

export const billListData = {
  pay: [
    {
      type: "foods",
      name: "Food and Dining",
      list: [
        { type: "food", name: "Meals" },
        { type: "drinks", name: "Beverages" },
        { type: "dessert", name: "Desserts" },
      ],
    },
    {
      type: "taxi",
      name: "Transportation",
      list: [
        { type: "taxi", name: "Taxi" },
        { type: "longdistance", name: "Work Distance" },
      ],
    },
    {
      type: "recreation",
      name: "Recreation and Entertainment",
      list: [
        { type: "bodybuilding", name: "Fitness" },
        { type: "game", name: "Entertainment" },
        { type: "audio", name: "Media" },
        { type: "travel", name: "Vacation" },
      ],
    },
    {
      type: "daily",
      name: "Daily Expenses",
      list: [
        { type: "clothes", name: "Clothing" },
        { type: "bag", name: "Accessories" },
        { type: "book", name: "Learning" },
        { type: "promote", name: "Skills" },
        { type: "home", name: "Decoration" },
      ],
    },
    {
      type: "other",
      name: "Other Expenses",
      list: [{ type: "community", name: "Community" }],
    },
  ],
  income: [
    {
      type: "professional",
      name: "Professional Income",
      list: [
        { type: "salary", name: "Salary" },
        { type: "overtimepay", name: "Overtime Pay" },
        { type: "bonus", name: "Bonus" },
      ],
    },
    {
      type: "other",
      name: "Other Income",
      list: [
        { type: "financial", name: "Financial Income" },
        { type: "cashgift", name: "Cash Gifts" },
      ],
    },
  ],
};

export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
  billListData[key].forEach((bill) => {
    bill.list.forEach((item) => {
      prev[item.type] = item.name;
    });
  });
  return prev;
}, {});

export const getOverview = (data = []) => {
  return data.reduce(
    (prev, item) => {
      return {
        ...prev,
        date: item.date,
        [item.type]: prev[item.type] + +item.money,
      };
    },
    { pay: 0, income: 0, date: null }
  );
};

export const getMonthOverview = (data, month) => {
  // Bills for a specific month may vary
  const bill = data.filter((item) => {
    return month === dayjs(item.date).get("month");
  });
  return getOverview(bill);
};
