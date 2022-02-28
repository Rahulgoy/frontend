import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
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
//
import {UserListHeadAttendance} from '../sections/@dashboard/user/UserListHeadCustom';
import USERLIST from '../_mocks_/user';
import { getDatabase, ref, onValue} from "firebase/database";
import * as XLSX from 'xlsx';
import AttendanceTables from './AttendanceTables';
import BothAttendanceTables from './BothAttendanceTables';
// ----------------------------------------------------------------------



export default function ViewAttendance() {
  const [students, setStudents] = useState([]);
  const [inStudents, setInStudents] = useState([]);
  const [outStudents, setOutStudents] = useState([]);
  
  
  useEffect(() => {
    console.log("Working....");
    
    const db=getDatabase();
    const stuValue=ref(db,'users/');
    onValue(stuValue,(snapshot)=>{
      const data=snapshot.val();
      // console.log(data);
      const arr = [];
      Object.keys(data).forEach(key => { 
        arr.push(data[key]);
      })
      // console.log(arr);
      setStudents(arr);
      const inArr = [];
      const outArr = [];
      arr.filter(user => user.IsOut===false).map(us=>inArr.push(us));
      arr.filter(user => user.IsOut===true).map(us=>outArr.push(us));

      setInStudents(inArr);
      setOutStudents(outArr);




    })
  }, []);


  // console.log(finalDate);
  return (
    <Page title="Student Records">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Attendance
          </Typography>
        </Stack>
        <AttendanceTables students={inStudents}
                          />
        <AttendanceTables students={outStudents}
                          />
        <BothAttendanceTables students={students}
                          />
        
        {/* <AttendanceTables selected={selected}
                          filterName={filterName}
                          filteredUsers={filteredUsers}
                          handleFilterByName={handleFilterByName}
                          setFinalDate={setFinalDate}
                          downloadExcel={downloadExcel}
                          order={order}
                          orderBy={orderBy}
                          students={students}
                          handleRequestSort={handleRequestSort}
                          handleSelectAllClick={handleSelectAllClick}
                          emptyRows={emptyRows}
                          isUserNotFound={isUserNotFound}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          handleChangePage={handleChangePage}
                          TABLE_HEAD={TABLE_HEAD}
                          handleChangeRowsPerPage={handleChangeRowsPerPage} /> */}
          
      </Container>
    </Page>
  );
}
