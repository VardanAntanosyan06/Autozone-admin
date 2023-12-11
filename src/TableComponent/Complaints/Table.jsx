import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import ReactPaginate from "react-paginate";
import "./Table.css"; // Import your existing CSS file
import Filter from "../../FilterComponent/Filter";
import LoadingAnimation from "../../Loading /Loading";
import { useNavigate } from "react-router-dom";
const Table = () => {
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
      .post("admin/getAllComplaintsDatas", { filter, date:filterDate })
      .then((response) => {
        setData(response.data.Complaint);
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
            <th>Ուղղարկողի հեռախոսահամարը</th>
            <th>Ստացողի հեռախոսահամարը</th>
            <th>Բողոք</th>
            <th>Գրանցման ամսաթիվ</th>
          </tr>
        </thead>
        <tbody>
          {displayedItems.map((e, i) => (
            <tr key={i}>
              <td>{e.sender.phoneNumber}</td>
              <td>{e.receiver.phoneNumber}</td>
              <td>{e.complaint}</td>
              <td>{e.createdAt.replace("T", " ").replace("Z", "")}</td>
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

export default Table;
