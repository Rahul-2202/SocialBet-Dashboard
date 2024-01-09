import React from "react";
import Image from "next/image";
import Logo from "@/public/Logo1.svg";
import profile from "@/public/profileImage.png";

const Navbar = () => {
  return (
    <main>
      <div className="flex-shrink-0 w-full h-20 flex flex-wrap justify-between items-center mx-auto p-4 rounded-bl-xl rounded-br-xl bg-[#242424]">
        <div className="flex gap-20 items-center">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image src={Logo} alt="Logo" className="h-14 w-12 ml-8" />
          </a>
          <div className="flex items-center gap-6">
            <a
              href="/bulkUpload"
              className="text-[#f1f1ef] text-lg font-bold py-2 px-4 border border-[#7053ff] rounded-xl"
            >
              Bulk Upload
            </a>
          </div>
        </div>
        <div className="inline-flex justify-center items-center gap-3 py-1 pl-1 pr-2 mr-6 rounded-xl border border-[#7053ff]">
          <Image src={profile} alt="Profile" className="h-12 w-12 rounded-lg" />
          <div className="flex flex-col justify-center items-start">
            <div className="text-[#f1f1ef] font-bold leading-normal">
              Admin Profile
            </div>
            <div className="text-[#b3b3b3] text-xs font-medium leading-normal">
              Administrator
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
