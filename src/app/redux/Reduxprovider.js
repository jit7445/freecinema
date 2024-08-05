'use client'; // Make sure this is placed correctly based on your Next.js setup

import { Provider } from "react-redux";
import appStore from "./appStore";

const ReduxProvider = ({ children }) => {
  return <Provider store={appStore}>{children}</Provider>;
};

export default ReduxProvider;
