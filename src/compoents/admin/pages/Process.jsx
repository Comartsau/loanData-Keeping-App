import {
  Card,
  CardBody,
  Button,
  Input,
  Typography,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  List,
  ListItem,
} from "@material-tailwind/react";

import Select from "react-select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import {Input} from 'antd'
import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";

import { locationStore } from "../../../store/Store";

import { FaRegEdit, FaRegSave, FaCheckCircle } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import { IoTrashBin } from "react-icons/io5";

import { getCustomer, addCustomer } from "../../../api/customerApi";

const Process = () => {
  //----------  Data Table --------------------//
  const [listData, setListData] = useState([]);
  const [isSearchable, setIsSearchable] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const dataLocationStore = useRecoilValue(locationStore);

  const locationOptions = dataLocationStore?.map((location) => ({
    value: location.id,
    label: location.name,
  }));

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (e) => {
    // ค้นหาข้อมูลลูกค้าที่ถูกเลือกจาก customerDataStore
    const locations = dataLocationStore.find(
      (location) => location.id === e.value
    );
    // เซ็ตข้อมูลลูกค้าที่ถูกเลือกใน state
    setSelectedLocation(locations);
  };

  console.log(selectedLocation);

  const fetchCustomer = async () => {
    try {
      const response = await getCustomer(searchQuery);
      setListData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = Array.isArray(listData)
    ? listData.slice(startIndex, endIndex)
    : [];

  const totalPages = Math.ceil(listData?.length / itemsPerPage);

  //------------- modal Add Product -----------------------//
  const [newCustomer, setNewCustomer] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataAdd, setDataAdd] = useState([]);

  const handleModalAdd = (data) => {
    setOpenModalAdd(!openModalAdd);
    setDataAdd(data);
  };

  // const handleAddCustomer = async () => {
  //   try {
  //     let data = {
  //       name: newCustomer.name,
  //       tell: newCustomer.tell,
  //       address: newCustomer.address,
  //     };

  //     const response = await addCustomer(data);
  //     // console.log(response);
  //     setOpenModalAdd(false);
  //     fetchCustomer();
  //     toast.success("เพิ่มข้อมูล สินค้า สำเร็จ");
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  const cardItems = [
    {
      id: 1,
      name: "ขอนแก่น",
      total: 1000,
      Paid: 400,
      overdue: 600,
    },
    {
      id: 2,
      name: "ขอนแก่น-2",
      total: 1000,
      Paid: 400,
      overdue: 600,
    },
    {
      id: 3,
      name: "มหาสารคาม",
      total: 1000,
      Paid: 400,
      overdue: 600,
    },
    {
      id: 4,
      name: "มุกดาหาร",
      total: 1000,
      Paid: 400,
      overdue: 600,
    },
    {
      id: 5,
      name: "มุกดาหาร-2",
      total: 1000,
      Paid: 400,
      overdue: 600,
    },
    {
      id: 3,
      name: "มหาสารคาม",
      total: 1000,
      Paid: 400,
      overdue: 600,
    },
    {
      id: 4,
      name: "มุกดาหาร",
      total: 1000,
      Paid: 400,
      overdue: 600,
    },
    {
      id: 5,
      name: "มุกดาหาร-2",
      total: 1000,
      Paid: 400,
      overdue: 600,
    },
    {
      id: 3,
      name: "มหาสารคาม",
      total: 1000,
      Paid: 400,
      overdue: 600,
    },
    {
      id: 4,
      name: "มุกดาหาร",
      total: 1000,
      Paid: 400,
      overdue: 600,
    },
    {
      id: 5,
      name: "มุกดาหาร-2",
      total: 1000,
      Paid: 400,
      overdue: 600,
    },
    {
      id: 3,
      name: "มหาสารคาม",
      total: 1000,
      Paid: 400,
      overdue: 600,
    },
    {
      id: 4,
      name: "มุกดาหาร",
      total: 1000,
      Paid: 400,
      overdue: 600,
    },
    {
      id: 5,
      name: "มุกดาหาร-2",
      total: 1000,
      Paid: 400,
      overdue: 600,
    },
  ];

  const [selectCard, setSelectCard] = useState([]);
  const [openModalProcess, setOpenModalProcess] = useState(false);

  const handleSelectCard = (item) => {
    setOpenModalProcess(!openModalProcess);
    setSelectCard(item);
  };

  const [amountDate , setAmountDate] = useState(0)
  const [amount , setAmount] = useState(0)

  console.log(amountDate)
  console.log(amount)

  return (
    <Card>
      <ToastContainer className="mt-10" autoClose={800} theme="colored" />
      <div className="flex flex-col w-full mt-10">
        <div className="w-full flex   px-0 md:px-10">
          <div className="w-full flex flex-col md:flex-row justify-center md:justify-start items-center gap-5">
            <div>
              <Input
                type="text"
                label="ค้นหาสถานที่"
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
                เพิ่มการบันทึกใหม่
              </Button>
            </div>
          </div>
        </div>

        {/* ------------ Card  ----------------------------------------- */}
        <Card className="mt-5 border-1 max-h-[60vh] lg:max-h-[70vh] overflow-auto px-3">
          <List className="flex flex-wrap  flex-row  w-full   ">
            {cardItems?.map((item, index) => (
              <ListItem
                key={index}
                className="flex-none w-full md:w-[300px] p-2  md:ps-10"
                onClick={() => handleSelectCard(item)}
              >
                <Card className="flex w-full flex-col  ">
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {item?.name}
                    </Typography>
                    <Typography>
                      ยอดรวม: {Number(item?.total).toLocaleString()} บาท
                    </Typography>
                    <Typography>
                      ชำระแล้ว: {Number(item?.Paid).toLocaleString()} บาท
                    </Typography>
                    <Typography>
                      ค้างชำระ: {Number(item?.overdue).toLocaleString()} บาท
                    </Typography>
                  </CardBody>
                </Card>
              </ListItem>
            ))}
          </List>
        </Card>
      </div>

      {/* modal Add Customer */}

      <Dialog
        open={openModalAdd}
        size="xs"
        handler={handleModalAdd}
        className="h-[65vh]"
      >
        <DialogHeader className="bg-purple-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">เพิ่มการบันทึกใหม่</Typography>
        </DialogHeader>
        <DialogBody divider className=" h-[47vh]">
          <div className=" w-full  flex flex-col justify-center mt-3  ">
            <Select
              className="  max-h-0"
              classNamePrefix="select"
              placeholder="เลือกบริษัท"
              // isClearable={isClearable}
              isSearchable={isSearchable}
              name="color"
              options={locationOptions}
              onChange={(e) => handleLocationSelect(e)}
            />
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
            color="purple"
            // onClick={handleAddCustomer}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">
              <FaRegSave />
            </span>
            บันทึก
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Process */}

      <Dialog open={openModalProcess} size="xxl" handler={handleSelectCard}>
        <DialogBody divider className=" h-[90vh] overflow-auto">
          <div className="flex  flex-col p-3 overflow-auto   items-center ">
            <div className="flex w-full flex-col md:flex-row gap-5 ">
              <div className="flex flex-col w-full h-[80vh]  md:w-3/12 ">
                <div className="flex  items-center gap-3">
                  <div>
                    <Typography className="text-lg lg:text-xl font-bold">
                      {selectCard?.name}
                    </Typography>
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
                      เพิ่มการบันทึกใหม่
                    </Button>
                  </div>
                </div>
                <div className=" w-full  flex flex-col justify-center mt-3  ">
                  <Select
                    classNamePrefix="select"
                    placeholder="เลือกบริษัท"
                    // isClearable={isClearable}
                    isSearchable={isSearchable}
                    name="color"
                    options={locationOptions}
                    onChange={(e) => handleLocationSelect(e)}
                  />
                </div>
                <div className="flex w-full flex-col lg:flex-row justify-center mt-3 gap-3  ">
                  <div className="w-full lg:w-[50%]">
                    {/* <Input
                      type="text"
                      label="จำนวนเงิน"
                      color="blue-gray"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ backgroundColor: "#F4F4F4" }}
                    /> */}
                    <div className=" relative w-full min-w-[100px] h-10">
                      <input
                        type="number"
                        min={0}
                        className="peer w-[100%] h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-gray-500 "
                        style={{ backgroundColor: "rgb(244,244,244)" }}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <label className="flex w-[100%] h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-gray-500 before:border-blue-gray-200 peer-focus:before:!border-blue-gray-500 after:border-blue-gray-200 peer-focus:after:!border-blue-gray-500">
                        จำนวนเงิน{" "}
                      </label>
                    </div>
                  </div>
                  <div className="w-full lg:w-[50%]">
                    {/* <Input
                      type="text"
                      label="จำนวนวัน"
                      color="blue-gray"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ backgroundColor: "#F4F4F4" }}
                    /> */}
                                 <div className=" relative w-full min-w-[100px] h-10">
                      <input
                        type="number"
                        min={0}
                        className="peer w-[100%] h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-gray-500 "
                        style={{ backgroundColor: "rgb(244,244,244)" }}
                        onChange={(e) => setAmountDate(e.target.value)}
                      />
                      <label className="flex w-[100%] h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-gray-500 before:border-blue-gray-200 peer-focus:before:!border-blue-gray-500 after:border-blue-gray-200 peer-focus:after:!border-blue-gray-500">
                        จำนวนวัน{" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col  w-full bg-green-500 gap-3 md:w-9/12 ">
                <div className=" flex flex-col sm:flex-row  items-center sm:items-start  w-full justify-center md:justify-end   gap-5  ">
                  <div className=" justify-center">
                    <Button
                      size="sm"
                      variant="gradient"
                      color="green"
                      className="text-base flex justify-center  items-center   bg-green-500"
                      // disabled={openPrint == true ? true : false}
                      // onClick={handleSendReceipt}
                    >
                      <span className="mr-2 text-xl ">
                        {/* <IoIosSave /> */}
                      </span>
                      บันทึก
                    </Button>
                  </div>

                  <div className=" justify-center">
                    <Button
                      size="sm"
                      variant="gradient"
                      color="red"
                      className="text-base flex justify-center  items-center   bg-green-500"
                      // onClick={handleout}
                    >
                      <span className="mr-2 text-xl ">
                        {/* <TbLogout2 /> */}
                      </span>
                      ออก
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="flex flex-col xl:flex-row w-full xl:gap-2 ">
                    <div className="flex flex-col xl:flex-row w-full  xl:gap-5 ">
                      <div className=" flex w-full xl:w-[50%] sm:flex-row items-end  lg:justify-start   mt-5 ">
                        <div>
                          <Typography className="flex w-[50px] justify-center font-bold ps-1 xl:w-[50px] ">
                            วันที่:
                          </Typography>
                        </div>
                        <div className="z-20">
                          <DatePicker
                            // yearDropdownItemNumber={100} // จำนวนปีที่แสดงใน Dropdown
                            // yearItemNumber={100} // จำนวนปีที่แสดงในปฏิทิน
                            // showYearDropdown
                            // showMonthDropdown
                            // scrollableYearDropdown
                            // scrollableMonthDropdown
                            // selected={searchQueryStart}
                            locale={th}
                            // disabled={openPrint == true ? true : false}
                            dateFormat=" วันที่ dd/MM/yyyy"
                            // onChange={(date) => setSearchQueryStart(date)}
                            className="w-full justify-start  rounded-md border border-gray-400 p-1 text-gray-600  shadow-sm focus:border-blue-500 focus:outline-none "
                          />
                        </div>
                      </div>
                      <div className=" flex xl:w-[50%] sm:flex-row items-end  lg:justify-start   mt-5  gap-2 ">
                        <div>
                          <Typography className="flex justify-end  items-baseline align-text-bottom font-bold min-w-[90px] ">
                            เลือกจุดขาย:
                          </Typography>
                        </div>
                        <div className="w-full">
                          <Select
                            className="basic-single   "
                            classNamePrefix="select"
                            placeholder="เลือกจุดขาย"
                            // isClearable={isClearable}
                            // isDisabled={openPrint == true ? true : false}
                            isSearchable={isSearchable}
                            name="color"
                            // options={shopOptions}
                            // onChange={(e) => handleShopSelect(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            size="sm"
            onClick={handleSelectCard}
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
            color="purple"
            // onClick={handleAddCustomer}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">
              <FaRegSave />
            </span>
            บันทึก
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};

export default Process;
