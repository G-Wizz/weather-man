import React from "react";
import moment from "moment";

const FormatDate = props => {
  const { getDate } = props;
  console.log(getDate);
  return <li>{moment(getDate).format("dddd, MMMM Do YYYY")}</li>;
};

export default FormatDate;
