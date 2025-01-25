import Image from "next/image";
import React from "react";

const LogoLoader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-pulse">
        <Image src="/Logo/HOR.LOGO-BLUE.png" alt="logo" width={350} height={350}/>
      </div>
    </div>
  );
};

export default LogoLoader;
