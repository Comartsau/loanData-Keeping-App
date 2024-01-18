import { Card, Button } from "@material-tailwind/react";
import { useState } from "react";
import Customer from "./Customer";

function Database() {
  const [activeCustomerMenu, setActiveCustomerMenu] = useState("menu1");

  return (
    <div>
      <Card className="w-full h-[86vh] overflow-auto  px-3">
        <div className="w-ful " >
          <div className=" item-center mt-5 flex w-full flex-col gap-2  lg:flex-row">
            <div className="flex  flex-col gap-10   sm:flex-row  ">
              <div className="flex  flex-col justify-center gap-5 sm:flex-row lg:gap-20  ">
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    variant="outlined"
                    className={`w-[150px] rounded-md py-3  px-4 shadow-lg border border-gray-400  ${
                      activeCustomerMenu === "menu1"
                        ? "bg-purple-300 text-white"
                        : ""
                    }`}
                    onClick={() => setActiveCustomerMenu("menu1")}
                  >
                    ลูกค้า
                  </Button>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-5 sm:flex-row lg:gap-20">
                <div className="flex justify-center">
                  <Button
                    variant="outlined"
                    size="lg"
                    className={`w-[150px]  py-3  px-4 shadow-lg border border-gray-400  ${
                      activeCustomerMenu === "menu2"
                        ? "bg-purple-300 text-white"
                        : ""
                    }`}
                    onClick={() => setActiveCustomerMenu("menu2")}
                  >
                    สถานที่
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {activeCustomerMenu === "menu1" && (
            <div className="w-full mt-5 ">
              {/* <hr className="  h-1 mt-5 bg-gray-200" /> */}
              <Customer />
            </div>
          )}
          {activeCustomerMenu === "menu2" && (
            <div>
              <hr className=" mt-5 border border-gray-500" />
              {/* <TaxInvoiceShort /> */}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Database;
