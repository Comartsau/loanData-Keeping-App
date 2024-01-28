import {
    Card,
    CardFooter,
    Button,
    IconButton,
    Input,
    Typography,
  } from "@material-tailwind/react";
  
  import { useState } from "react";
  
  import { FaRegEdit } from "react-icons/fa";
  import { BsPlusCircle } from "react-icons/bs";
  import { IoTrashBin } from "react-icons/io5";
  
  const NotPaidLocation = () => {
    const [listData, setListData] = useState([
      {
        name: "user01",
        location: "ขอนแก่น",
        borrowed: 1500,
        paid: 700,
        balance: 800,
      },
      {
        name: "user02",
        location: "หน้าโรงแรม A",
        borrowed: 5000,
        paid: 2700,
        balance: 2300,
      },
      {
        name: "user03",
        location: "บึงแก่นนคร",
        borrowed: 2500,
        paid: 500,
        balance: 2000,
      },
    ]);
  
    const [searchQuery, setSearchQuery] = useState("");
  
    //----- จัดการแสดงข้อมูล / หน้า -------------- //
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = Array.isArray(listData)
      ? listData.slice(startIndex, endIndex)
      : [];
  
    const totalPages = Math.ceil(listData?.length / itemsPerPage);
    return (
      <div>
        <div className=" h-[74vh]  ">
        <Typography className="text-center mt-5 text-red-500 text-xl font-bold">อยู่ระหว่างการพัฒนา (เฟส2)</Typography>
          <div className="flex flex-col w-full">
            {/* <p>ข้อมูลผู้บริจาค</p> */}
            <div className="w-full  flex  flex-col-reverse items-center md:flex-row justify-center sm:justify-between  ">
              <div className="w-full md:w-[50%] flex mt-5   px-0 md:mx-10 ">
                <Typography className=" font-bold ">
                  รายงานลูกค้าทั้งหมดที่ยังจ่ายเงินไม่ครบ:
                </Typography>
              </div>
              <div className="w-full md:w-[50%] flex   px-0 md:px-10">
                <div className="w-full flex flex-col md:flex-row justify-center md:justify-end items-center gap-5">
                  <div>
                    <Input
                      type="text"
                      label="ค้นหา สถานที่ที่ต้องการ"
                      //   placeholder="ค้นหา ชื่อลูกค้า"
                      color="blue-gray"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ backgroundColor: "#F4F4F4" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-5">
              <div className="flex w-full lg:w-[80%] ">
                <Card className="mt-5 w-full border-2 overflow-auto ">
                  <div className="mx-5">
                    <table className="w-full min-w-max ">
                      <thead>
                        <tr>
                          <th className="border-y border-purple-100 bg-purple-300/50 p-4 ">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              ลำดับ
                            </Typography>
                          </th>
                          <th className="border-y border-purple-100 bg-purple-300/50 p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              ชื่อ
                            </Typography>
                          </th>
                          <th className="border-y border-purple-100 bg-purple-300/50 p-4 ">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              สถานที่
                            </Typography>
                          </th>
                          <th className="border-y border-purple-100 bg-purple-300/50 p-4 ">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              จำนวนยืม
                            </Typography>
                          </th>
                          <th className="border-y border-purple-100 bg-purple-300/50 p-4 ">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              จ่ายแล้ว
                            </Typography>
                          </th>
                          <th className="border-y border-purple-100 bg-purple-300/50 p-4  ">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              ยอดค้างจ่าย
                            </Typography>
                          </th>
                        </tr>
                      </thead>
                      {listData?.length == 0 ? (
                        <tbody>
                          <tr>
                            <td colSpan={6} className=" text-center pt-5 ">
                              <Typography>...ไม่พบข้อมูล...</Typography>
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody>
                          {displayedData.map((data, index) => {
                            const isLast = index === displayedData.length - 1;
                            const pageIndex = startIndex + index;
                            const classes = isLast
                              ? "p-2"
                              : "p-3 border-b border-blue-gray-50";
  
                            return (
                              <tr key={index}>
                                <td className={classes}>
                                  <div className="flex items-center justify-center">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal "
                                    >
                                      {pageIndex + 1 || ""}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={classes}>
                                  <div className="flex items-center justify-center">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal "
                                    >
                                      {data?.name || ""}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={classes}>
                                  <div className="flex items-center justify-center">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal "
                                    >
                                      {data?.location || ""}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={classes}>
                                  <div className="flex items-center justify-center ">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal "
                                    >
                                      {Number(data?.borrowed).toLocaleString() ||
                                        ""}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={classes}>
                                  <div className="flex items-center justify-center ">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal "
                                    >
                                      {Number(data?.paid).toLocaleString() || ""}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={classes}>
                                  <div className="flex items-center justify-center ">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal "
                                    >
                                      {Number(data?.balance).toLocaleString() ||
                                        ""}
                                    </Typography>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      )}
                    </table>
                  </div>
                  <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Button
                      variant="outlined"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      ก่อนหน้า
                    </Button>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <IconButton
                          key={i}
                          variant="outlined"
                          size="sm"
                          onClick={() => setCurrentPage(i + 1)}
                          className={
                            currentPage === i + 1
                              ? "bg-purple-400 text-white"
                              : ""
                          }
                        >
                          {i + 1}
                        </IconButton>
                      ))}
                    </div>
                    <Button
                      variant="outlined"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      ถัดไป
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="flex w-full lg:w-[20%] flex-col h-full   justify-center md:justify-end   ">
                <div
                  className="p-3 md:h-[180px] items-center mt-5 px-5  "
                  style={{ border: "3px solid black" }}
                >
                  <Typography className=" font-bold mt-5">
                    จำนวนยืม: <sapn className="font-normal">1,000 บาท</sapn>
                  </Typography>
                  <Typography className=" font-bold mt-3">
                    จ่ายแล้ว: <sapn className="font-normal">600 บาท</sapn>
                  </Typography>
                  <Typography className=" font-bold mt-3">
                    ค้างจ่าย: <sapn className="font-normal">400 บาท</sapn>
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default NotPaidLocation;
  