// import React, { Component } from "react";
// import DataTable from "react-data-table-component";
// import styles from "./ReactTable.module.scss";

// const ExpandedComponent = ({ data }) => (
//   <pre>{JSON.stringify(data, null, 2)}</pre>
// );

// const columns = [
//   {
//     name: "Title",
//     selector: (row) => row.title,
//   },
//   {
//     name: "Year",
//     selector: (row) => row.year,
//   },
//   {
//     name: "date",
//     selector: (row) => row.date,
//   },
//   {
//     name: "code",
//     selector: (row) => row.code,
//   },
//   {
//     name: "name",
//     selector: (row) => row.name,
//     title: (row) => row.name,
//     cell: (row) => (
//       <div title={row.name} id={row.id}>
//         {row.name}
//       </div>
//     ),
//   }
// ];
// function randomIntFromInterval() {
//   // min and max included
//   let min = 10,
//     max = 100;
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// const data = [
//   {
//     id: randomIntFromInterval(),
//     title: "Ghostbusters",
//     year: "1984",
//     date: Date.now(),
//     code: "abc",
//     name: "JavaScript Date now() Method",
//     name2: "JavaScript Date now() Method",
//     name3: "JavaScript Date now() Method",
//   },
//   {
//     id: randomIntFromInterval(),
//     title: "Ghostbusters",
//     year: "1984",
//     date: Date.now(),
//     code: "abc",
//     name: "JavaScript Date now() Method",
//   }
 
// ];

// export default class ReactTable extends Component {
//   render() {
//     return (
//       <div className={styles.reactTable }>
//         <DataTable
//           columns={columns}
//           data={data}
//           selectableRows
//           expandableRowsComponent={ExpandedComponent}
//           fixedHeader
//         />
//       </div>
//     );
//   }
// }
