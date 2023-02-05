import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
// import DeleteIcon from '@mui/icons-material/Delete';
import AddLibrary from "../../../components/dialog/AddLibrary";
import API from "../../../utils/services/API";
import Iconify from "../../../components/Iconify";
import LibraryMoreMenu from "./LibraryMoreMenu";

// function createData(name, id) {
//   return {
//     name,
//     id,
//     history: [
//       {
//         name: 'sub name',
//         id: 1,
//       },
//       {
//         name: 'sub name',
//         id: 2,
//       },
//     ],
//   };
// }

function Row(props) {
  const { row, cb } = props;
  const [expand, setExpand] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);


  const deleteLibrary = (id) => {
    API.delete(`/api/libraries/${ id }`).then((res) => cb());
  };

  const addSubLibrary = (id) => {
    setDialogOpen(true)
  };

  const handleLibraryMenu = (action, id) => {
    console.log(action, id);
    if (action === "delete") deleteLibrary(id);
    else if (action === "add") addSubLibrary(id);
  };

  const handleCloseLibrary =() => {
    setDialogOpen(false)
    cb()
  } 

  const deleteSubLibrary = (id, subId) => {
    API.delete(`/api/libraries/${ id }/sublibrary/${subId}`)
    .then(() => cb());
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setExpand(!expand)}
          >
            <Iconify
              icon={
                expand
                  ? "eva:arrow-ios-downward-fill"
                  : "eva:arrow-ios-forward-fill"
              }
            />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row._id}</TableCell>
        <TableCell align="right">
          <LibraryMoreMenu
            cb={(action) => handleLibraryMenu(action, row._id)}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={expand} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                ჩამონათვალი
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>დასახელება</TableCell>
                    <TableCell>id</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.library.map((subLibrary) => (
                    <TableRow key={subLibrary._id}>
                      <TableCell component="th" scope="row">
                        {subLibrary.name}
                      </TableCell>
                      <TableCell>{subLibrary._id}</TableCell>
                      <TableCell>
                      <IconButton aria-label="delete" onClick={()=> deleteSubLibrary(row._id,subLibrary._id)}>
                        {/* <DeleteIcon /> */}
                        <Iconify icon={'ic:round-delete'} color="#637381" width={25} height={25} />
                      </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <AddLibrary open={dialogOpen} handleClose={handleCloseLibrary} target={"Sublibrary"} id={row._id} />
    </>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         id: PropTypes.number.isRequired,
//       }),
//     ).isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Frozen yoghurt', 159),
//   createData('Ice cream sandwich', 237),
//   createData('Eclair', 262),
//   createData('Cupcake', 305),
//   createData('Gingerbread', 356),
// ];

export default function LibraryCollapsibleTable({ refresh }) {
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState([]);

  const getLibrary = () => {
    setDataLoading(true);

    API.get(`/api/libraries?all=true`)
      .then((res) => {
        setData(res.data.items);
        console.log(res.data.items);
      })
      .finally(() => setDataLoading(false));
  };

  useEffect(() => {
    getLibrary();
  }, []);

  useEffect(() => {
    if (refresh === false) getLibrary();
  }, [refresh]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Naming</TableCell>
            <TableCell align="right">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row._id} row={row} cb={getLibrary} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
