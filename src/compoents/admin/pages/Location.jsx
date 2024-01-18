import {
  Card,
  Button,
  Input,
  Typography,
  IconButton,
  CardFooter,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";

// import {Input} from 'antd'
import { useState } from "react";

import { FaRegEdit, FaRegSave, FaCheckCircle } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import { IoTrashBin } from "react-icons/io5";

const Location = () => {
  //----------  Data Table --------------------//
  const [noData, setNoData] = useState(false);
  const [listData, setListData] = useState([
    {
      name: "aaa",
      tel: 1234567890,
      address: "123/45 หมู่ 3 ต.ในเมือง อ.เมือง จ.ขอนแก่น",
    },
    {
      name: "bbb",
      tel: 1234567890,
      address: "123/45 หมู่ 3 ต.ในเมือง อ.เมือง จ.ขอนแก่น",
    },
    {
      name: "ccc",
      tel: 1234567890,
      address: "123/45 หมู่ 3 ต.ในเมือง อ.เมือง จ.ขอนแก่น",
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

  const totalPages = Math.ceil(listData.length / itemsPerPage);

  //------------- modal Add Product -----------------------//
  const [newLocation, setNewLocation] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataAdd, setDataAdd] = useState([]);

  const handleModalAdd = (data) => {
    setOpenModalAdd(!openModalAdd);
    setDataAdd(data);
  };

  //------------- modal Edit Product -----------------------//
  const [editLocation, setEditLocation] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);

  const handleModalEdit = (data) => {
    setOpenModalEdit(!openModalEdit);
    setDataEdit(data);
  };

  // console.log(newCustomer)

  //------------- modal Delete Product -----------------------//

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState([]);

  const handleModalDelete = (data) => {
    setOpenModalDelete(!openModalDelete);
    setDataDelete(data);
  };

  return (
    <div className=" h-[70vh]  ">
      <div className="flex flex-col w-full">
        {/* <p>ข้อมูลผู้บริจาค</p> */}
        <div className="w-full  flex  flex-col-reverse items-center md:flex-row justify-center sm:justify-between  ">
          <div className="w-full md:w-[50%] flex mt-5   px-0 md:mx-10 ">
            <Typography className=" font-bold ">ข้อมูลสถานที่:</Typography>
          </div>
          <div className="w-full md:w-[50%] flex   px-0 md:px-10">
            <div className="w-full flex flex-col md:flex-row justify-center md:justify-end items-center gap-5">
              <div>
                <Input
                  type="text"
                  label="ค้นหา สถานที่"
                  //   placeholder="ค้นหา ชื่อลูกค้า"
                  color="blue-gray"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ backgroundColor: "#F4F4F4" }}
                />
              </div>
              <div>
                <Button
                  size="sm"
                  variant="gradient"
                  color="green"
                  className="text-base flex justify-center  items-center   bg-green-500"
                  onClick={handleModalAdd}
                >
                  <span className="mr-2 text-xl">
                    <BsPlusCircle />
                  </span>
                  เพิ่มสถานที่
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* ------------ table  ----------------------------------------- */}
        <Card className="mt-5  border-2 overflow-auto ">
          <div>
            <table className="w-full min-w-max  ">
              <thead>
                <tr>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4  w-1">
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
                      ชื่อสถานที่
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 ">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      เบอร์โทรศัพท์
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 ">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      ที่อยู่สำนักงาน
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1  ">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      แก้ไข/ลบ
                    </Typography>
                  </th>
                </tr>
              </thead>
              {noData ? (
                <tbody>
                  <tr>
                    <td colSpan={5} className=" text-center pt-5 ">
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
                              {data.name || ""}
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
                              {data.tel || ""}
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
                              {data?.address || ""}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex justify-center  px-3 gap-2">
                            <IconButton
                              variant="outlined"
                              size="sm"
                              onClick={() => handleModalEdit(data)}
                            >
                              <FaRegEdit className="h-5 w-5  text-yellow-700 " />
                            </IconButton>

                            <IconButton
                              variant="outlined"
                              color="blue"
                              size="sm"
                              onClick={() => handleModalDelete(data)}
                            >
                              <IoTrashBin className="h-5 w-5  text-red-700 " />
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
                    currentPage === i + 1 ? "bg-purple-400 text-white" : ""
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

      {/* modal Add Location */}

      <Dialog open={openModalAdd} size="xs" handler={handleModalAdd}>
        <DialogHeader className="bg-purple-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">เพิ่มข้อมูลสถานที่</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className=" w-full flex flex-col justify-center  gap-4 ">
            <div className="w-full flex flex-col justify-center gap-4  ">
              <div className="flex   mt-3">
                <Input
                  type="text"
                  label="ชื่อสถานที่"
                  maxLength="50"
                  color="blue-gray"
                  style={{ backgroundColor: "#F4F4F4" }}
                  onChange={(e) =>
                    setNewLocation({
                      ...newLocation,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex  mt-3">
                <Input
                  type="text"
                  label="เบอร์โทรศัพท์"
                  maxLength="10"
                  color="blue-gray"
                  style={{ backgroundColor: "#F4F4F4" }}
                  onChange={(e) =>
                    setNewLocation({
                      ...newLocation,
                      tel: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex   mt-3">
                <Textarea
                  label="ที่อยู่สำนักงาน"
                  maxLength="100"
                  color="blue-gray"
                  style={{ backgroundColor: "#F4F4F4" }}
                  onChange={(e) =>
                    setNewLocation({
                      ...newLocation,
                      address: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            size="sm"
            onClick={handleModalAdd}
            className="flex mr-1 text-base"
          >
            <span className="text-xl mr-2">
              <AiOutlineStop />
            </span>
            ยกเลิก
          </Button>
          <Button
            size="sm"
            variant="gradient"
            color="green"
            // onClick={handleAddProduct}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">
              <FaRegSave />
            </span>
            บันทึก
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Edit Customer */}

      <Dialog open={openModalEdit} size="xs" handler={handleModalEdit}>
        <DialogHeader className="bg-yellow-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">แก้ไขข้อมูลสถานที่</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className=" w-full flex flex-col justify-center  gap-4 ">
            <div className="w-full flex flex-col justify-center gap-4  ">
              <div className="flex   mt-3">
                <Input
                  type="text"
                  label="ชื่อสถานที่"
                  maxLength="50"
                  color="blue-gray"
                  style={{ backgroundColor: "#F4F4F4" }}
                  value={dataEdit.name}
                  onChange={(e) =>
                    setEditLocation({
                      ...editLocation,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex  mt-3">
                <Input
                  type="text"
                  label="เบอร์โทรศัพท์"
                  maxLength="10"
                  color="blue-gray"
                  style={{ backgroundColor: "#F4F4F4" }}
                  value={dataEdit.tel}
                  onChange={(e) =>
                    setEditLocation({
                      ...editLocation,
                      tel: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex   mt-3">
                <Textarea
                  label="ที่อยู่สถานที่"
                  maxLength="100"
                  color="blue-gray"
                  style={{ backgroundColor: "#F4F4F4" }}
                  value={dataEdit.address}
                  onChange={(e) =>
                    setEditLocation({
                      ...editLocation,
                      address: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            size="sm"
            onClick={handleModalEdit}
            className="flex mr-1 text-base"
          >
            <span className="text-xl mr-2">
              <AiOutlineStop />
            </span>
            ยกเลิก
          </Button>
          <Button
            size="sm"
            variant="gradient"
            color="green"
            // onClick={handleEditProduct}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">
              <FaRegSave />
            </span>
            บันทึก
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Delete Customer */}

      <Dialog open={openModalDelete} size="sm" handler={handleModalDelete}>
        <DialogHeader className="bg-red-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">ลบสถานที่</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col w-full justify-center gap-3 ">
            <Typography variant="h5" className="text-center">
              ต้องการลบ สถานที่: {dataDelete?.code || ""}{" "}
            </Typography>
            <Typography variant="h5" className="text-center">
              จริงหรือไม่?{" "}
            </Typography>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className=" flex w-full justify-center  gap-5 ">
            <Button
              variant="gradient"
              color="red"
              size="sm"
              // onClick={() => handleDelete(String(dataDelete?.id))}
              className="flex mr-1 text-base"
            >
              <span className="text-xl mr-2"><FaCheckCircle /></span>
              ตกลง
            </Button>
            <Button
              variant="gradient"
              color="blue-gray"
              size="sm"
              onClick={handleModalDelete}
              className="flex mr-1 text-base"
            >
              <span className="text-xl mr-2"><AiOutlineStop /></span>
              ยกเลิก
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Location;
