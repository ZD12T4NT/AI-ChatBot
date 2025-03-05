"use client"; // ✅ Ensure this runs on the client

import { Provider } from "react-redux";
import { store } from "./index";

export default function Providers({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
