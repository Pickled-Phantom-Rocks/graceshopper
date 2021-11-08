import React, { useState, useEffect } from 'react';
import {OrderList} from './order';


function Pagination (props) {
    const { baseURL } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${baseURL}/orders`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		})
        .then((response) => response.json())
        .then((dat) => setData(dat))
        .catch((error) => console.error(error));
    }, []);



    function Pagination({ data, RenderComponent, title, pageLimit, dataLimit }) {
        const [pages] = useState(Math.round(data.length / dataLimit));
        const [currentPage, setCurrentPage] = useState(1);
        useEffect(() => {
            window.scrollTo({ behavior: 'smooth', top: '0px' });
        }, [currentPage]);
        function goToNextPage() {
            setCurrentPage((page) => page + 1);
          }
      
        function goToPreviousPage() {
           setCurrentPage((page) => page - 1);
        }
      
        function changePage(event) {
            const pageNumber = Number(event.target.textContent);
            setCurrentPage(pageNumber);
        }
      
        const getPaginatedData = () => {
            const startIndex = currentPage * dataLimit - dataLimit;
            const endIndex = startIndex + dataLimit;
            return data.slice(startIndex, endIndex);
        };
      
        const getPaginationGroup = () => {
            let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
            return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
        };
      
        return (
            <div>
              <h1>{title}</h1>
              <div>
                {getPaginatedData().map((d, idx) => (
                  <RenderComponent key={idx} data={d} />
                ))}
              </div>
              <div>
                <button
                    onClick={goToPreviousPage}>
                    prev
                </button>
                {getPaginationGroup().map((item, index) => (
                <button
                    key={index}
                    onClick={changePage}>
                    <span>{item}</span>
                </button>
                ))}
                <button
                    onClick={goToNextPage}>
                    next
                </button>
              </div>
            </div>
          );
      }

    return <div></div>;
}

export default Pagination;