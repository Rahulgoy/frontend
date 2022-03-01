import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination
  } from '@mui/material';
  // components
  import Page from '../components/Page';
  import Label from '../components/Label';
  import Scrollbar from '../components/Scrollbar';
  import Iconify from '../components/Iconify';
  import SearchNotFound from '../components/SearchNotFound';
  import {  UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
  import {UserListHeadAttendance} from '../sections/@dashboard/user/UserListHeadCustom';
  import USERLIST from '../_mocks_/user';
  import { filter } from 'lodash';
  import * as XLSX from 'xlsx';

//   UserListToolbar.propTypes = {
//     selected: PropTypes.array,
//     filterName: PropTypes.string,
//     filteredUsers: PropTypes.array,
//     handleFilterByName: PropTypes.func,
//     setFinalDate: PropTypes.func,
//     downloadExcel: PropTypes.func,
//     order: PropTypes.string,
//     orderBy: PropTypes.string,
//     students: PropTypes.array,
//     handleRequestSort: PropTypes.func,
//     handleSelectAllClick: PropTypes.func,
//     emptyRows: PropTypes.number,
//     isUserNotFound: PropTypes.bool,
//     rowsPerPage: PropTypes.number,
//     page: PropTypes.number,
//     handleChangePage: PropTypes.func,
//     TABLE_HEAD: PropTypes.array,
//     handleChangeRowsPerPage: PropTypes.func
//   };

UserListToolbar.propTypes = {
    students: PropTypes.array,
}

  const TABLE_HEAD = [
    { id: 'rollNumber', label: 'Roll Number', alignRight: false },
    // { id: 'name', label: 'Name', alignRight: false },
    { id: 'hostel', label: 'Hostel', alignRight: false },
    { id: 'date',label:'Date',alignRight:false },
    { id: 'time',label:'Time',alignRight:false },
    { id: 'status',label:'Status',alignRight:false },
  ];
  
  // ----------------------------------------------------------------------
  
  
  
  
  
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }


const AttendanceTables = ({students}) => {
    const [finalDate, setFinalDate] = useState(null);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = students.map((n) => n.name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleFilterByName = (event) => {
      setFilterName(event.target.value);
    };
  
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
  
   
    var filteredUsers = applySortFilter(students, getComparator(order, orderBy), filterName);
    if(finalDate){
      // console.log(user.Date.toString()===finalDate.toString())
      // console.log("Called: ",filteredUsers)
      const filUsers = []
      filteredUsers.filter(user => user.date.toString()===finalDate.toString()).map(us=>filUsers.push(us))
      // console.log("After: ",filUsers)
      filteredUsers = filUsers
    }
    const isUserNotFound = filteredUsers.length === 0;
    
    
    const downloadExcel=()=>{
      console.log("Download")
      const workSheet=XLSX.utils.json_to_sheet(filteredUsers)
      const workBook=XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workBook,workSheet,"students")
      // Buffer
      let buf = XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
      // Binary string
      XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
      // 
      XLSX.writeFile(workBook,"StudentAttendance.xlsx"); 
  
    }
  
  
    return (
    <Card sx={{ mt: '20px' }}>
    <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            setFinalDate={setFinalDate}
            downloadExcel = {downloadExcel}
            component="Attendance"
            
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHeadAttendance
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={students.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, rollNumber, imageUrl, hostel, date, time, isOut } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;
                      return (
                        <TableRow
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={imageUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {rollNumber}
                              </Typography>
                            </Stack>
                          </TableCell>
                          {/* <TableCell align="left">{name}</TableCell> */}
                          <TableCell align="left">{hostel}</TableCell>
                          <TableCell align="left">{date}</TableCell>
                          <TableCell align="left">{time}</TableCell>
                          <TableCell>{isOut?"Out":"In"}</TableCell>
                          {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}
                          {/* <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(status === 'banned' && 'error') || 'success'}
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell> */}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
  )
}

export default AttendanceTables