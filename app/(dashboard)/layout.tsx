import {FC, PropsWithChildren} from "react";

const DashboardLayout: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={"h-full relative"}>
      <div className={"hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900"}></div>
    </div>
  );
}

export default DashboardLayout

