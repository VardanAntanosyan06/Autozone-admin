import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import ReactPaginate from "react-paginate";
import "../Table.css"; // Import your existing CSS file
import Filter from "../../FilterComponent/Filter";
import LoadingAnimation from "../../Loading /Loading";
import { useNavigate } from "react-router-dom";
import idram from "./photo_2023-12-11_15-46-30.jpg"
import tellcel from "./photo_2023-12-11_15-46-49.jpg"
import AciveButton from "../../UI/AciveButton"; 
import TimeoutButton from "../../UI/TimeoutButton";

const SubscribtionPayment = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = (filter = "", filterDate = null) => {
    if(filterDate) filterDate = filterDate.toISOString().split("T")[0]
    axios
      .post("admin/getAllSubscribtionData", { filter, date:filterDate })
      .then((response) => {
        setData(response.data.PaymentInfo);
      })
      .catch((e) => setTimeout(() => {
        navigate("/login")
        localStorage.removeItem("token")
      }, 1500));
  };

  const handleFilterButtonClick = (filter, filterDate) => {
    fetchData(filter, filterDate);
  };

  let pageCount = 0;
  let displayedItems = []
  if(data){
    pageCount = Math.ceil(data.length / itemsPerPage);
    displayedItems  = data.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
      );
    }
  let height = window.innerHeight - 45;

  return data ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height,
      }}
    >
      <Filter onFilterButtonClick={handleFilterButtonClick} />
      <table border="1px">
        <thead>
          <tr>
            <th>Հ/Հ</th>
            <th>Գրանցման ամսաթիվ</th>
            <th>Հեռախոսահամար</th>
            <th>Կարգավիճակ</th>
            <th>Վճարման տեսակ</th>
          </tr>
        </thead>
        <tbody>
          {displayedItems.map((e) => (
            <tr key={e.id}>
              <td>{e.SubscribtionPayments[0].id}</td>
              <td>
                {e.SubscribtionPayments[0].createdAt
                  .replace("T", " ")
                  .replace("Z", "")
                  .replaceAll("-", "/")}
              </td>
              <td>+{e.phoneNumber}</td>
              <td>{new Date(e.SubscribtionPayments[0].endDate)>new Date()?<AciveButton/>:<TimeoutButton/>}</td>
              <td>{e.SubscribtionPayments[0].paymentWay=="Tellcel"?<img src={tellcel} style={{width:65+"px",height:35+"px"}}/>:<img src={idram} style={{width:65+"px",height:25+"px"}}/>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{width:90+"%",display:"flex",justifyContent:"space-between",alignItems:"center",paddingLeft:50+"px"}}>
      <b>{data.length} Արդյունք</b>
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={(selectedPage) => setCurrentPage(selectedPage.selected)}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
      </div>     
    </div>
  ) : (
    <LoadingAnimation />
  );
};

export default SubscribtionPayment;
