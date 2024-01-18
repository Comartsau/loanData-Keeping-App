/* eslint-disable react-hooks/exhaustive-deps */
import { FireFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";

const Logo = ({ darkTheme, toggleTheme }) => {

  const [textToggle , setTextToogle] = useState(darkTheme)

  const toggleText = () => {
    setTextToogle(!textToggle)
  }

  useEffect(()=>{
    toggleText()
  },[darkTheme])

  return (
    <div className="logo">
      <div className="logo-icon">
        {/* <FireFilled /> */}
        <p className={textToggle ? "text-black" : "text-white"}>Menu</p>
        {/* <p className="text-white" >Menu</p> */}
      </div>
    </div>
  );
};

export default Logo;
