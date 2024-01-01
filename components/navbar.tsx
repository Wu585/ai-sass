import {UserButton} from "@clerk/nextjs";
import MobileSidebar from "@/components/mobile-sidebar";
import {getApiLimitCount} from "@/lib/api-limit";

const Navbar = async () => {
  const apiCountLimit = await getApiLimitCount()

  return (
    <div className={"flex items-center p-4"}>
      <MobileSidebar apiLimitCount={apiCountLimit}/>
      <div className={"flex w-full justify-end"}>
        <UserButton afterSignOutUrl={"/"}/>
      </div>
    </div>
  );
}

export default Navbar

