import React from "react";
import { MdWarning } from "react-icons/md";

export const Warning = ({ children }) => (
  <div className="a-alert as--warning">
    <MdWarning /> {children}
  </div>
);
