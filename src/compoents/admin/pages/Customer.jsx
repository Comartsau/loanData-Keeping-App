import {
  Card,
  Button,
  Input,
  Typography,
  IconButton,
  CardFooter,
} from "@material-tailwind/react";

// import {Input} from 'antd'
import { useState } from "react";

const Customer = () => {
  //----------  Data Table --------------------//
  const [noData, setNoData] = useState(false);
  const [listData, setListData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = Array.isArray(listData)
    ? listData.slice(startIndex, endIndex)
    : [];

  const totalPages = Math.ceil(listData.length / itemsPerPage);

  return (
    <div className=" h-[70vh] pt-5 ">
      <div className="flex flex-col w-full">
        {/* <p>ข้อมูลผู้บริจาค</p> */}
        <div className="flex  flex-col-reverse items-center md:flex-row justify-center sm:justify-between  ">
          <div className="flex justify-center  px-0 md:mx-10 ">
            <div className="flex flex-col gap-3 mt-5 md:mt-0 ">
              <Typography className=" font-bold">
                ข้อมูลลูกค้า:
              </Typography>
            </div>
          </div>
          <div className="flex justify-center px-0 md:px-10">
            <Input
              type="text"
              label="ค้นหา ชื่อลูกค้า"
              //   placeholder="ค้นหา ชื่อลูกค้า"
              color="blue-gray"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ backgroundColor: "#F4F4F4" }}
            />
          </div>
        </div>
        {/* ------------ table  ----------------------------------------- */}
        <Card className="mt-5  border-2 overflow-auto ">
          <div className="p-3">
            <table className="w-full min-w-max  ">
              <thead>
                <tr>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      ลำดับ
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      ใบกำกับภาษี
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      ดู
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      ลบ
                    </Typography>
                  </th>
                </tr>
              </thead>
              {noData ? (
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
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
                              {data?.code || ""}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex justify-center">
                            <IconButton
                              variant="outlined"
                              color="blue"
                              size="sm"
                              className="ml-3 "
                              //   onClick={() => handleModalView(data)}
                            >
                              {/* <BsFillEyeFill className="h-5 w-5  text-light-blue-700 " /> */}
                            </IconButton>
                          </div>
                        </td>

                        <td className={classes}>
                          <div className="flex justify-center ">
                            <IconButton
                              variant="outlined"
                              size="sm"
                              color="red"
                              className="rounded-full"
                              //   onClick={() => handleModalDelete(data)}
                            >
                              {/* <AiFillDelete color="red" className="h-5 w-5" /> */}
                            </IconButton>
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
              //   disabled={currentPage === 1}
              //   onClick={() => setCurrentPage(currentPage - 1)}
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
                    currentPage === i + 1 ? "bg-blue-500 text-white" : ""
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
    </div>
  );
};

export default Customer;
