import {
  Card,
  CardBody,
  Button,
  IconButton,
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

import moment from "moment/min/moment-with-locales";

import { useEffect, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";

import { locationStore, customerStore } from "../../../store/Store";

import { FaRegSave, FaExchangeAlt } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";
import { BsPlusCircle, BsFillEyeFill } from "react-icons/bs";

import {
  getProcess,
  addProcess,
  getUpdateAll,
  getProcessUser,
  userUpdate,
  getProcessUserList,
  changeStatus,
  getProcessUserListSum,
} from "../../../api/ProcessApi";
import { getCustomer } from "../../../api/customerApi";

const Process = () => {
  //----------  Data Table --------------------//
  const [listData, setListData] = useState([]);
  const [dataProcessId, setDataProcessId] = useState([]);
  const [activeCustomerMenu, setActiveCustomerMenu] = useState("menu1");
  const [sumUser, setSumUser] = useState([]);
  const [cardId, setCardId] = useState("");

  const [listDataCustomer, setListDataCustomer] = useState([]);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isClearable, setIsClearable] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRow, setActiveRow] = useState();
  const [activeRow2, setActiveRow2] = useState(0);

  const [selectedShop, setSelectedShop] = useState(null);

  const handleShopSelect = (e) => {
    // ค้นหาข้อมูลลูกค้าที่ถูกเลือกจาก customerDataStore
    const shop = shopDataStore.find((shop) => shop.id === e.value);
    // เซ็ตข้อมูลลูกค้าที่ถูกเลือกใน state
    // console.log(shop);
    setSelectedShop(shop);
  };

  const [customerDataStore, setCustomerDataStore] =
    useRecoilState(customerStore);
  const locationDataStore = useRecoilValue(locationStore);

  const locationOptions = locationDataStore?.map((location) => ({
    value: location.id,
    label: location.name,
  }));

  const customerOptions = customerDataStore?.map((customer) => ({
    value: customer.id,
    label: customer.name,
  }));

  const fetchProcess = async () => {
    try {
      const response = await getProcess(searchQuery);
      setListData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProcess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const fetchCustomer = async () => {
    try {
      const response = await getCustomer(searchQuery);
      setCustomerDataStore(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUpdateAll = async (processId) => {
    try {
      const response = await getUpdateAll(processId);
      // console.log(response);
      setDataProcessId(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStatus = async (statused) => {
    try {
      const response = await getProcessUser(cardId, statused);
      console.log(response);
      setListDataCustomer(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (cardId) {
      fetchStatus(" ");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId]);

  const [userId, setUserId] = useState("");

  const fetchUserList = async (id) => {
    try {
      setUserId(id);
      const response = await getProcessUserList(id);
      console.log(response);
      setSumUser(response);
    } catch (error) {
      console.error(error);
    }
  };

  const [userListSum, setUserListSum] = useState([]);

  const fetchUserListSum = async (id) => {
    try {
      const response = await getProcessUserListSum(id);
      console.log(response);
      setUserListSum(response);
    } catch (error) {
      console.error(error);
    }
  };

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 300;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = Array.isArray(listDataCustomer)
    ? listDataCustomer.slice(startIndex, endIndex)
    : [];

  const totalPages = Math.ceil(listDataCustomer?.length / itemsPerPage);

  //------------- modal Add Process -----------------------//

  const [openModalAddProcess, setOpenModalAddProcess] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const handleModalAddProcess = () => {
    setOpenModalAddProcess(!openModalAddProcess);
  };
  const handleModalConfirm = () => {
    setOpenModalConfirm(!openModalConfirm);
    setOpenModalAddProcess(false);
  };

  const handleAddProcess = async () => {
    try {
      let data = {
        house_id: selectedLocation?.id,
      };

      const response = await addProcess(data);
      console.log(response);
      if (response == undefined) {
        toast.error("สถานที่นี้ถูกสร้างไปแล้ว");
      } else {
        toast.success("เพิ่มข้อมูล Process สำเร็จ");
      }

      fetchProcess();

      setOpenModalConfirm(false);
    } catch (error) {
      toast.error(error);
    }
  };

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (e) => {
    // ค้นหาข้อมูลลูกค้าที่ถูกเลือกจาก customerDataStore
    const locations = locationDataStore.find(
      (location) => location.id === e.value
    );
    // เซ็ตข้อมูลลูกค้าที่ถูกเลือกใน state
    setSelectedLocation(locations);
  };

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleCustomerSelect = (e) => {
    // ค้นหาข้อมูลลูกค้าที่ถูกเลือกจาก customerDataStore
    const customer = customerDataStore.find(
      (customer) => customer.id === e.value
    );
    // เซ็ตข้อมูลลูกค้าที่ถูกเลือกใน state
    setSelectedCustomer(customer);
    setSelectedValue(e);
  };

  const [selectCard, setSelectCard] = useState([]);
  const [openModalProcess, setOpenModalProcess] = useState(false);

  const handleSelectCard = async (item) => {
    setOpenModalProcess(!openModalProcess);
    setSelectCard(item);
    setCardId(item?.id);
    await fetchUpdateAll(item?.id);
  };

  const [amountDate, setAmountDate] = useState(0);
  const [amount, setAmount] = useState(0);

  const [searchQueryStart, setSearchQueryStart] = useState(new Date());
  const [searchQueryEnd, setSearchQueryEnd] = useState(new Date());

  // Function to add days to a date
  const addDays = (date, days) => {
    const newDate = new Date(date);
    newDate?.setDate(newDate.getDate() + days);
    return newDate;
  };

  // Handle change for searchQueryStart
  const handleSearchQueryStartChange = (date) => {
    setSearchQueryStart(date);

    // Update searchQueryEnd based on the new value of daysToAdd
    setSearchQueryEnd(addDays(date, amountDate));
  };

  // Handle change for daysToAdd
  const handleDaysToAddChange = (event) => {
    const inputValue = event.target.value || 0;
    const newDaysToAdd = parseInt(inputValue, 10);
    setAmountDate(newDaysToAdd);

    if (searchQueryStart) {
      setSearchQueryEnd(addDays(searchQueryStart, newDaysToAdd));
    }
  };

  const handleUser = async () => {
    try {
      let data = {
        process_id: cardId,
        user_id: selectedCustomer?.id,
        price: Number(amount),
        count_day: Number(amountDate),
        start_day: startDate,
        end_day: startEnd,
      };

      const response = await userUpdate(data);
      console.log(response);
      setAmountDate(0);
      setAmount(0);
      setSearchQueryStart(new Date());
      setSearchQueryEnd(new Date());
      setSelectedValue(null);
      if (response == undefined) {
        toast.error("ไม่สามารถเพิ่มหรืออัพเดรท ลูกค้า ได้");
      } else {
        toast.success("เพิ่ม/อัพเดรทข้อมูล ลูกค้า สำเร็จ");
        fetchStatus();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const startDate = moment(searchQueryStart).format("DD-MM-YYYY");
  // const startEnd = moment(searchQueryEnd).format("DD-MM-YYYY");

  // const startDate = moment(searchQueryStart).add(543, 'years').format('YYYY-MM-DD')
  const startDate = moment(searchQueryStart).format("YYYY-MM-DD");
  const startEnd = moment(searchQueryEnd).format("YYYY-MM-DD");

  const [userListData, setUserListData] = useState([]);

  const handleChangeStatus = async (changestatus, dataed) => {
    console.log(dataed);
    try {
      let data = {
        id: dataed?.id,
        status: changestatus,
        price: dataed?.price,
        process_user_id: userId,
        process_id: cardId,
      };

      console.log(data);

      const response = await changeStatus(data);
      console.log(response);
      if (response == undefined) {
        toast.error("เปลี่ยนสถานะ ไม่สำเร็จ");
      } else {
        toast.success("เปลี่ยนสถานะ สำเร็จ");
        fetchUserList(userId);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  console.log(userListData);
  return (
    <Card>
      <div className="flex flex-col w-full mt-5 ">
        <ToastContainer className="toast " autoClose={800} theme="colored" />
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
                onClick={handleModalAddProcess}
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
            {listData?.map((item, index) => (
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
                      ชำระแล้ว: {Number(item?.paid).toLocaleString()} บาท
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

      {/* modal Add Process */}

      <Dialog
        open={openModalAddProcess}
        handler={handleModalAddProcess}
        size="xs"
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
            onClick={handleModalAddProcess}
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
            onClick={handleModalConfirm}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">
              <FaRegSave />
            </span>
            บันทึก
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Add Confirm */}

      <Dialog
        open={openModalConfirm}
        handler={handleModalConfirm}
        size="xs"
        className="h-[20vh] "
      >
        <DialogHeader className="bg-purple-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">ยืนยันการสร้าง</Typography>
        </DialogHeader>
        {/* <DialogBody divider className=" h-[47vh]">
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
        </DialogBody> */}
        <DialogFooter className="flex justify-center gap-5 mt-3">
          <Button
            variant="text"
            color="red"
            size="sm"
            onClick={handleModalConfirm}
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
            onClick={handleAddProcess}
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

      <Dialog open={openModalProcess} size="xxl">
        <DialogBody divider className=" h-[90vh]   overflow-auto">
          <div className="flex  flex-col  overflow-auto   items-center ">
            <div className="flex w-full flex-col md:flex-row gap-5 ">
              <div className="flex flex-col w-full h-[85vh]   md:w-3/12 ">
                <div className="flex  items-center gap-3">
                  <div>
                    <Typography className="text-lg lg:text-xl font-bold">
                      {selectCard?.name || ""}
                    </Typography>
                  </div>
                  <div>
                    <Button
                      size="sm"
                      variant="gradient"
                      color="green"
                      className="text-base flex justify-center  items-center   bg-green-500"
                      // onClick={handleModalAdd}
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
                    placeholder="เลือกลูกค้า"
                    isClearable={isClearable}
                    isSearchable={isSearchable}
                    value={selectedValue}
                    name="color"
                    options={customerOptions}
                    onChange={(e) => handleCustomerSelect(e)}
                  />
                </div>
                <div className="flex w-full flex-col lg:flex-row justify-center mt-3 gap-3  ">
                  <div className="w-full lg:w-[50%]">
                    <div className=" relative w-full min-w-[100px] h-10">
                      <input
                        type="number"
                        min={0}
                        value={amount}
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
                    <div className=" relative w-full min-w-[100px] h-10">
                      <input
                        type="number"
                        min={0}
                        value={amountDate}
                        className="peer w-[100%] h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-gray-500 "
                        style={{ backgroundColor: "rgb(244,244,244)" }}
                        onChange={handleDaysToAddChange}
                      />
                      <label className="flex w-[100%] h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-gray-500 before:border-blue-gray-200 peer-focus:before:!border-blue-gray-500 after:border-blue-gray-200 peer-focus:after:!border-blue-gray-500">
                        จำนวนวัน{" "}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col lg:flex-row justify-center mt-3 gap-3  ">
                  <div className="w-full lg:w-[50%]">
                    <div className=" relative w-full min-w-[100px] h-10">
                      <DatePicker
                        selected={searchQueryStart}
                        locale={th}
                        dateFormat="เริ่มต้น dd/MM/yyyy"
                        onChange={handleSearchQueryStartChange}
                        className="w-full rounded-md border border-gray-400 p-2 text-gray-600  shadow-sm focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-[50%]">
                    <div className=" relative w-full min-w-[100px] h-10">
                      <DatePicker
                        selected={searchQueryEnd}
                        disabled
                        locale={th}
                        dateFormat="สิ้นสุด dd/MM/yyyy"
                        onChange={(date) => setSearchQueryEnd(date)}
                        className="w-full rounded-md border border-gray-400 p-2 text-gray-600  shadow-sm focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col lg:flex-row justify-center mt-3 gap-3  ">
                  <div className="w-full ">
                    <Button
                      size="sm"
                      variant="gradient"
                      color="gray"
                      className="text-base flex justify-center  items-center w-full   bg-green-500"
                      // onClick={handleout}
                    >
                      <span className="mr-2 text-xl ">
                        {/* <TbLogout2 /> */}
                      </span>
                      ออก
                    </Button>
                  </div>
                  <div className="w-full">
                    <Button
                      size="sm"
                      variant="gradient"
                      color="green"
                      className="text-base flex justify-center  items-center  w-full  bg-green-500"
                      // disabled={openPrint == true ? true : false}
                      onClick={handleUser}
                    >
                      <span className="mr-2 text-xl ">
                        {/* <IoIosSave /> */}
                      </span>
                      บันทึก
                    </Button>
                  </div>
                </div>
                <div className="flex w-full flex-col h-full   justify-center md:justify-end   ">
                  <div
                    className="p-3 md:h-[210px] items-center   "
                    style={{ border: "3px solid black" }}
                  >
                    <Typography className="text-xl font-bold ">
                      ยอดรวม(ทั้งหมด)
                    </Typography>
                    <Typography className=" font-bold mt-5">
                      ยอดรวม (ทั้งหมด):{" "}
                      <sapn>
                        {Number(dataProcessId?.total).toLocaleString() == "NaN"
                          ? 0
                          : Number(dataProcessId?.total).toLocaleString()}
                      </sapn>{" "}
                      บาท
                    </Typography>
                    <Typography className=" font-bold mt-3">
                      ชำระแล้ว (ทั้งหมด):{" "}
                      <sapn>
                        {Number(dataProcessId?.paid).toLocaleString() == "NaN"
                          ? 0
                          : Number(dataProcessId?.paid).toLocaleString()}
                      </sapn>{" "}
                      บาท
                    </Typography>
                    <Typography className=" font-bold mt-3">
                      ค้างชำระ (ทั้งหมด):{" "}
                      <sapn>
                        {Number(dataProcessId?.overdue).toLocaleString() ==
                        "NaN"
                          ? 0
                          : Number(dataProcessId?.overdue).toLocaleString()}
                      </sapn>{" "}
                      บาท
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="flex flex-col  w-full gap-3 md:w-9/12 ">
                <div className=" flex flex-col sm:flex-row  items-center sm:items-start  w-full justify-center md:justify-start px-10   gap-5  ">
                  <div className=" justify-center">
                    <Button
                      size="lg"
                      variant="outlined"
                      className={`w-[150px] rounded-md py-3  px-4 shadow-lg border border-gray-400  ${
                        activeCustomerMenu === "menu1"
                          ? " bg-blue-300 "
                          : "bg-blue-100"
                      }`}
                      onClick={() => [
                        setActiveCustomerMenu("menu1"),
                        fetchStatus(""),
                      ]}
                    >
                      ทั้งหมด
                    </Button>
                  </div>
                  <div className=" justify-center">
                    <Button
                      size="lg"
                      variant="outlined"
                      className={`w-[150px] rounded-md py-3  px-4 shadow-lg border border-gray-400 `}
                      style={{
                        backgroundColor:
                          activeCustomerMenu === "menu2"
                            ? "#FFEB3B"
                            : "#ebdb6b",
                      }}
                      onClick={() => [
                        setActiveCustomerMenu("menu2"),
                        fetchStatus(0),
                      ]}
                    >
                      กำลังจ่าย
                    </Button>
                  </div>
                  <div className=" justify-center">
                    <Button
                      size="lg"
                      variant="outlined"
                      className={`w-[150px] rounded-md py-3  px-4 shadow-lg border border-gray-400  ${
                        activeCustomerMenu === "menu3"
                          ? " bg-green-500 text-white"
                          : "bg-green-300 text-white"
                      }`}
                      onClick={() => [
                        setActiveCustomerMenu("menu3"),
                        fetchStatus(1),
                      ]}
                    >
                      จ่ายครบแล้ว
                    </Button>
                  </div>
                  <div className=" justify-center">
                    <Button
                      size="lg"
                      variant="outlined"
                      className={`w-[150px] rounded-md py-3  px-4 shadow-lg border border-gray-400  ${
                        activeCustomerMenu === "menu4"
                          ? " bg-red-500 text-white"
                          : "bg-red-300 text-white"
                      }`}
                      onClick={() => [
                        setActiveCustomerMenu("menu4"),
                        fetchStatus(2),
                      ]}
                    >
                      ลูกค้าเสีย
                    </Button>
                  </div>
                </div>
                <div className=" flex flex-col sm:flex-row  items-center sm:items-start  w-full justify-center md:justify-start   ">
                  <Card
                    className="w-full h-[45vh] p-2"
                    style={{ border: "3px solid black" }}
                  >
                    <div className="mt-5 h-[380px] overflow-auto ">
                      <table className="w-full min-w-max  ">
                        <thead>
                          <tr>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
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
                                ลูกค้า
                              </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                              >
                                จำนวนเงิน
                              </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                              >
                                จำนวนวัน
                              </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                              >
                                วันที่เริ่มต้น
                              </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                              >
                                วันที่สิ้นสุด
                              </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                              >
                                สถานะ
                              </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                              >
                                เลือก
                              </Typography>
                            </th>
                          </tr>
                        </thead>
                        {listDataCustomer?.length == 0 ? (
                          <tbody>
                            <tr>
                              <td colSpan={8}>
                                <Typography className="mt-5 text-center">
                                  ...ไม่พบข้อมูล...
                                </Typography>
                              </td>
                            </tr>
                          </tbody>
                        ) : (
                          <tbody>
                            {displayedData?.map((data, index) => {
                              const isLast = index === displayedData?.length;
                              const classes = isLast
                                ? "p-2"
                                : `p-3 border-b border-blue-gray-50 ${
                                    index === activeRow ? "bg-gray-300" : ""
                                  }`;
                              return (
                                <tr key={index}>
                                  <td className={classes}>
                                    <div className="flex items-center justify-center">
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                      >
                                        {index + 1 || ""}
                                      </Typography>
                                    </div>
                                  </td>
                                  <td className={classes}>
                                    <div className="flex items-center justify-center">
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                      >
                                        {data?.name}
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
                                        {Number(data?.total).toLocaleString() ||
                                          ""}
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
                                        {data?.count_day || ""}
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
                                        {data?.start_day || ""}
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
                                        {data?.end_day || ""}
                                      </Typography>
                                    </div>
                                  </td>
                                  <td className={classes}>
                                    <div className="flex items-center justify-center">
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className={`font-normal ${
                                          data?.status == "0"
                                            ? "bg-yellow-300 bg-opacity-60 px-3  rounded-lg "
                                            : data?.status == "1"
                                            ? "bg-green-300  bg-opacity-60 px-3  rounded-lg"
                                            : data?.status == "3"
                                            ? "bg-purple-500  bg-opacity-60 px-3   rounded-lg"
                                            : ""
                                        } `}
                                      >
                                        {data?.status == 0
                                          ? "กำลังจ่าย"
                                          : data?.status == 1
                                          ? "จ่ายครบแล้ว"
                                          : data?.status == 2
                                          ? "จ่ายแล้ว"
                                          : data?.status == 3
                                          ? "รียอด"
                                          : ""}
                                      </Typography>
                                    </div>
                                  </td>
                                  <td className={classes}>
                                    <div className="flex items-center justify-center">
                                      <IconButton
                                        variant="outlined"
                                        color="blue"
                                        size="sm"
                                        className="ml-3 "
                                        onClick={() => [
                                          setActiveRow(index),
                                          fetchUserList(data?.id),
                                          setUserListData(data),
                                          fetchUserListSum(data.id),
                                        ]}
                                      >
                                        <BsFillEyeFill className="h-5 w-5  text-light-blue-700 " />
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
                  </Card>
                </div>
                <div className=" flex flex-col sm:flex-row  items-center sm:items-start  w-full justify-center md:justify-start gap-5  ">
                  <div className="w-full md:w-[70%]">
                    <Card
                      className="w-full  h-[30vh]  p-2"
                      style={{ border: "3px solid black" }}
                    >
                      <div className="h-[380px] overflow-auto ">
                        <table className="w-full min-w-max  ">
                          <thead>
                            <tr>
                              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold leading-none opacity-70"
                                >
                                  จำนวน
                                </Typography>
                              </th>
                              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold leading-none opacity-70"
                                >
                                  วันที่
                                </Typography>
                              </th>
                              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold leading-none opacity-70"
                                >
                                  ราคา
                                </Typography>
                              </th>
                              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold leading-none opacity-70"
                                >
                                  สถานะ
                                </Typography>
                              </th>
                              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold leading-none opacity-70"
                                >
                                  เลือก
                                </Typography>
                              </th>
                            </tr>
                          </thead>
                          {sumUser?.length == 0 ? (
                            <tbody>
                              <tr>
                                <td colSpan={8}>
                                  <Typography className="mt-5 text-center">
                                    ...ไม่พบข้อมูล...
                                  </Typography>
                                </td>
                              </tr>
                            </tbody>
                          ) : (
                            <tbody>
                              {sumUser?.map((data, index) => {
                                const isLast = index === sumUser?.length;
                                const pageIndex = startIndex + index;
                                const classes = isLast
                                  ? "p-2"
                                  : `p-3 border-b border-blue-gray-50 ${
                                      index === activeRow2 ? "bg-gray-300" : ""
                                    }`;
                                return (
                                  <tr key={index}>
                                    <td className={classes}>
                                      <div className="flex items-center justify-center">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal"
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
                                          className="font-normal"
                                        >
                                          {data?.date}
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
                                          {data?.price || ""}
                                        </Typography>
                                      </div>
                                    </td>
                                    <td className={classes}>
                                      <div className="flex items-center justify-center">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className={`font-normal ${
                                            data?.status == "0"
                                              ? "bg-green-300 bg-opacity-60 px-3   rounded-lg "
                                              : data?.status == "1"
                                              ? "bg-red-300 bg-opacity-60 px-3   rounded-lg"
                                              : ""
                                          } `}
                                        >
                                          {data?.status == 0
                                            ? "จ่ายแล้ว"
                                            : data?.status == 1
                                            ? "ยังไม่จ่าย"
                                            : ""}
                                        </Typography>
                                      </div>
                                    </td>
                                    <td className={classes}>
                                      <div className="flex items-center justify-center">
                                        <IconButton
                                          variant="outlined"
                                          color="blue"
                                          size="sm"
                                          className="ml-3 "
                                          onClick={() => [
                                            setActiveRow2(index),
                                            handleChangeStatus(
                                              data?.status == 0
                                                ? 1
                                                : data?.status == 1
                                                ? 0
                                                : "",
                                              data
                                            ),
                                          ]}
                                        >
                                          <FaExchangeAlt className="h-5 w-5  text-light-blue-700 " />
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
                    </Card>
                  </div>
                  <div
                    className="flex w-full md:w-[30%] md:h-[210px]  "
                    style={{ border: "3px solid black" }}
                  >
                    <div className="gap-3  p-3">
                      <Typography className="text-xl font-bold">
                        ยอดรวม ({userListData?.name})
                      </Typography>
                      <Typography className=" font-bold mt-5">
                        ยอดรวม (ทั้งหมด):{" "}
                        <sapn>
                          {" "}
                          {Number(sumUser?.total).toLocaleString() == "NaN"
                            ? 0
                            : Number(sumUser?.total).toLocaleString()}
                        </sapn>{" "}
                        บาท
                      </Typography>
                      <Typography className=" font-bold mt-3">
                        ชำระแล้ว (ทั้งหมด):{" "}
                        <sapn>
                          {Number(sumUser?.paid).toLocaleString() == "NaN"
                            ? 0
                            : Number(sumUser?.paid).toLocaleString()}
                        </sapn>{" "}
                        บาท
                      </Typography>
                      <Typography className=" font-bold mt-3">
                        ค้างชำระ (ทั้งหมด):{" "}
                        <sapn>
                          {Number(sumUser?.overdue).toLocaleString() == "NaN"
                            ? 0
                            : Number(sumUser?.overdue).toLocaleString()}
                        </sapn>{" "}
                        บาท
                      </Typography>
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
            onClick={() => [
              setOpenModalProcess(false),
              setDataProcessId([]),
              setActiveRow(),
              setSumUser([]),
              setUserId(""),
            ]}
            className="flex mr-1 text-base"
          >
            <span className="text-xl mr-2">
              <AiOutlineStop />
            </span>
            ยกเลิก
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Add Customer */}

      {/* <Dialog open={openModalAdd} size="xs" handler={handleModalAdd}>
        <DialogHeader className="bg-purple-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">เพิ่มข้อมูลลูกค้า</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className=" w-full flex flex-col justify-center  gap-4 ">
            <div className="w-full flex flex-col justify-center gap-4  ">
              <div className="flex   mt-3">
                <Input
                  type="text"
                  label="ชื่อลูกค้า"
                  maxLength="50"
                  color="blue-gray"
                  style={{ backgroundColor: "#F4F4F4" }}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
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
                    setNewCustomer({
                      ...newCustomer,
                      tell: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex   mt-3">
                <Textarea
                  label="ที่อยู่"
                  maxLength="100"
                  color="blue-gray"
                  style={{ backgroundColor: "#F4F4F4" }}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
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
            color="purple"
            onClick={handleAddCustomer}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">
              <FaRegSave />
            </span>
            บันทึก
          </Button>
        </DialogFooter>
      </Dialog> */}
    </Card>
  );
};

export default Process;
