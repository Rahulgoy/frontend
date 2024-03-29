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
  const _ = require("lodash"); 
  const [students, setStudents] = useState([]);
  const [inStudents, setInStudents] = useState([]);
  const [outStudents, setOutStudents] = useState([]);
  const [finalStudents, setFinalStudents] = useState([]);
  
  
  useEffect(() => {
    console.log("Working....");
    
    const db=getDatabase();
    const stuValue=ref(db,'users/');
    onValue(stuValue,(snapshot)=>{
      const data=snapshot.val();
      // console.log(data);
      const arr = [];
      const final = [];
      Object.keys(data).forEach(key => { 
        arr.push(data[key]);
      })
      // console.log("Arr: ",arr);
      setStudents(arr);
      const inArr = [];
      const outArr = [];
      arr.filter(user => user.isOut===false).map(us=>inArr.push(us));
      arr.filter(user => user.isOut===true).map(us=>outArr.push(us));

      setInStudents(inArr);
      setOutStudents(outArr);


      // const groupByCategory = arr.reduce((group, product) => {
      //   const { rollNumber } = product;
      //   group[rollNumber] = group[rollNumber] ?? [];
      //   group[rollNumber].push(product);
      //   return group;
      // }, {});

      // const rollGroups = []
      // Object.keys(groupByCategory).forEach(key => { 
      //   rollGroups.push(groupByCategory[key]);
      // })
      // // console.log("RollGroups: ",rollGroups)

      // rollGroups.map((groupedRoll) =>
      //     {
      //       const groupByIsOut = groupedRoll.reduce((group, product) => {
      //         const { isOut } = product;
      //         group[isOut] = group[isOut] ?? [];
      //         group[isOut].push(product);
      //         return group;
      //       }, {});
      //       const isOutGroups = []
      //       Object.keys(groupByIsOut).forEach(key => { 
      //         isOutGroups.push(groupByIsOut[key]);
      //       })
      //       var temp = isOutGroups;
      //       // console.log(temp);
      //       isOutGroups.map(tgroup=>{
      //         tgroup.sort((a,b) => b.time - a.time);
      //         tgroup.slice(0,1).map((item, i) => final.push(item))
      //       })
      //       console.log(final);
      //     }
      //   ); 
      
      // const finalList = []
      // const groupByRoll = final.reduce((group, product) => {
      //   const { rollNumber } = product;
      //   group[rollNumber] = group[rollNumber] ?? [];
      //   group[rollNumber].push(product);
      //   return group;
      // }, {});

      // const rollGroupsAfterSort = []
      // Object.keys(groupByRoll).forEach(key => { 
      //   rollGroupsAfterSort.push(groupByRoll[key]);
      // })

      // console.log(rollGroupsAfterSort);

      // rollGroupsAfterSort.map(roll =>{

      //   const atten = {
      //     date: '',
      //     rollNumber: '',
      //     inTime: '',
      //     outTime: ''
      //   }

      //   // console.log(roll.length)
      //   if(roll.length===1){
      //     if(roll[0].isOut){
      //       atten.outTime = roll[0].time;
      //       atten.inTime = "0"
      //     }else{
      //       atten.outTime = "0";
      //       atten.inTime = roll[0].time;
      //     }
      //   }else{
      //     if(roll[0].isOut){
      //       atten.outTime = roll[0].time;
      //       atten.inTime = roll[1].time;
      //     }else{
      //       atten.outTime = roll[1].time;
      //       atten.inTime = roll[0].time;
      //     }
      //   }
        
      //   atten.date=roll[0].date;
      //   atten.rollNumber = roll[0].rollNumber;
      //   // console.log(atten)
      //   finalList.push(atten);
      // })
      // // console.log(finalList);

      // setFinalStudents(finalList)


      var output = _.map(_.groupBy(arr, 'date'),function(obj, key){
        var temp = {};
        temp[key] = _.groupBy(obj, 'rollNumber')
        return temp;
      });
      // console.log(JSON.stringify(output, null,' '))
      // console.log(output);
      // isOutGroups.map(tgroup=>{
      //   tgroup.sort((a,b) => b.time - a.time);
      //   tgroup.slice(0,1).map((item, i) => final.push(item))
      // })
      var result = [];
      const finalList = []
      output.map(dateWise=>{
        
        for(const idx in dateWise){
          // console.log(typeof(dateWise[idx]))
          // console.log(dateWise[idx])

          const rollWise = []
          Object.keys(dateWise[idx]).forEach(key => { 
            rollWise.push(dateWise[idx][key]);
          })
          rollWise.map(tgroup=>{
              // console.log(tgroup)
              tgroup.sort((a,b) => b.time - a.time);
              var inT = [];
              tgroup.filter(item=>item.isOut===false).map(i=>inT.push(i));
              var outT = [];
              tgroup.filter(item=>item.isOut===true).map(i=>outT.push(i));
              
              inT.slice(0,1).map((item, i) => {
                if(result[item.date]!==undefined){
                  var ar = result[item.date];
                ar.push(item);
                result[item.date] = ar;
                }else{
                  result[item.date] = [item];
                }
              })
              outT.slice(0,1).map((item, i) => {
                if(result[item.date]!==undefined){
                  var ar = result[item.date];
                ar.push(item);
                result[item.date] = ar;
                }else{
                  result[item.date] = [item];
                }
              })
            })

          // console.log(rollWise)
        //   for(const roll in dateWise[idx]){
        //     console.log(roll)
        //     
        //   }
              
        }
        // console.log(result);
        const resultRoll = []
          Object.keys(result).forEach(key => { 
            resultRoll.push(result[key]);
          })
        resultRoll.map(roll=>{
          // console.log(roll)

          
      const groupByRoll = roll.reduce((group, product) => {
        const { rollNumber } = product;
        group[rollNumber] = group[rollNumber] ?? [];
        group[rollNumber].push(product);
        return group;
      }, {});

      const rollGroupsAfterSort = []
      Object.keys(groupByRoll).forEach(key => { 
        rollGroupsAfterSort.push(groupByRoll[key]);
      })

      console.log(groupByRoll);

      rollGroupsAfterSort.map(roll =>{

        const atten = {
          date: '',
          rollNumber: '',
          inTime: '',
          outTime: ''
        }

        // console.log(roll.length)
        if(roll.length===1){
          if(roll[0].isOut){
            atten.outTime = roll[0].time;
            atten.inTime = "0"
          }else{
            atten.outTime = "0";
            atten.inTime = roll[0].time;
          }
        }else{
          if(roll[0].isOut){
            atten.outTime = roll[0].time;
            atten.inTime = roll[1].time;
          }else{
            atten.outTime = roll[1].time;
            atten.inTime = roll[0].time;
          }
        }
        
        atten.date=roll[0].date;
        atten.rollNumber = roll[0].rollNumber;
        console.log(atten)

        finalList.push(atten);
      })
        })
      })
      const unique = (value, index, self) => {
        return self.indexOf(value) === index
      }
      const uniqueVals = finalList.filter(unique)
      setFinalStudents(uniqueVals)
      

      })
  }, []);

console.log(finalStudents)
  
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
        <BothAttendanceTables students={finalStudents}
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
