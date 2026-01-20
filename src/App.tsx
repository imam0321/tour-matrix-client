import { Outlet, ScrollRestoration } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";

function App() {
  return (
    <>
      <ScrollRestoration />
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </>
  );
}

export default App;
