import {FC, PropsWithChildren} from "react";

const LandingLayout:FC<PropsWithChildren> = ({children}) => {
  return (
    <main className={"h-full bg-[#111827] overflow-auto"}>
      <div className={"mx-auto max-w-screen-xl h-full"}>
        {children}
      </div>
    </main>
  );
}

export default LandingLayout

