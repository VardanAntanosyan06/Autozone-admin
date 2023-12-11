import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import ReactPaginate from "react-paginate";
import "./Table.css"; // Import your existing CSS file
import Filter from "../../FilterComponent/Filter";
import visa from "./visa.png";
import Rejectbutton from '../../UI/Rejectbutton'
import Subbmitedgbutton from "../../UI/SubmitedPutton"
import PendingButton from "../../UI/PendingButton"
import LoadingAnimation from "../../Loading /Loading";
import { useNavigate } from "react-router-dom";

const PaymentTable = () => {
  const navigate =  useNavigate()
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 14;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = (filter = "", filterDate = null) => {
    axios
      .get("admin/getAllPaymentData", { filter, filterDate })
      .then((response) => {
        setData(response.data.results);
        console.log(response.data);
      })
      .catch((e) => setTimeout(() => {
        navigate("/login")
        localStorage.removeItem("token")
      }, 1500));;
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
        marginTop:30+"px"
      }}
    >
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
              <td>{e.id}</td>
              <td>
                {e.created_at
                  .replace("T", " ")
                  .replace("Z", "")
                  .replaceAll("-", "/")}
              </td>
              <td>{e.phone}</td>
              <td style={{ marginLeft: 30 + "px" }}>
                {e.status === 1 && <PendingButton />}
                {e.status === 2 && <Subbmitedgbutton />}
                {e.status === 3 && <Rejectbutton />}
              </td>
              <td>
                <img src={visa} alt="Visa" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={"Նախորդը"}
        nextLabel={"Հաջորդը"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(selectedPage) => setCurrentPage(selectedPage.selected)}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  ) : (
    <LoadingAnimation />
  );
};

export default PaymentTable;
