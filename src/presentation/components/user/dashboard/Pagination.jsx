// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <ul className="pagination">
//       {pageNumbers.map((page) => (
//         <li
//           key={page}
//           className={currentPage === page ? "active" : ""}
//           onClick={() => onPageChange(page)}
//         >
//           {page}
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default Pagination;
import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Pagination
    
      count={totalPages}
      page={currentPage}
      onChange={(event, page) => onPageChange(page)}
      shape="rounded"
      size="large"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
        sx={{height:"20px"}}
          component="li"
          {...item}
          onClick={() => onPageChange(item.page)}
        />
      )}
    />
  );
};

export default CustomPagination;
