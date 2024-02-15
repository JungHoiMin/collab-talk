import '@pages/home/Home.css';
import React, {KeyboardEvent, useCallback, useEffect, useState} from "react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  styled,
  Table, TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead, TablePagination,
  TableRow, TextField
} from "@mui/material";
import {axiosInstance} from "@apis/AxiosInstance";
import {loadImageSourceByEmail, searchFriends, TSearchDataForTable} from "@apis/home/HomeApi";
import useInputState from "@hooks/InputState";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

export const CTAddFriend = () => {
  const [searchKeyword, , onChangeSearchKeyword] = useInputState<string>('')
  const [searchData, setSearchData] = useState<TSearchDataForTable[]>([])
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const onChangePage = useCallback((event: any, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }, []);

  const onKeyDownSearchInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      onClickSearchButton()
  };

  const onClickSearchButton = useCallback(() => {
    if (searchKeyword === '')
      return;
    searchFriends(searchKeyword).then((data) => {
      setSearchData(data)
    })
  }, [searchKeyword]);

  return (
    <>
      <div className="ctChatMain">
        <Box sx={{width: {sm: `calc(100% - ${60}px)`} }} className="ctFriendSearchBox">
          <TextField
            variant="outlined"
            size="small"
            label="이름 or 닉네임"
            sx={{width: {sm: `calc(100% - ${100 + 10}px)`}, mr: {sm: `${10}px`} }}
            onKeyDown={onKeyDownSearchInput}
            onChange={onChangeSearchKeyword}
          />
          <Button variant="outlined" sx={{width: {sm: `${100}px`} }} onClick={onClickSearchButton}>찾기</Button>
        </Box>
        <TableContainer component={Paper} sx={{width: {sm: `calc(100% - ${60}px)`}, height: {sm: `calc(100% - ${100 + 60}px)`} }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell width="40"></StyledTableCell>
                <StyledTableCell>이름</StyledTableCell>
                <StyledTableCell>닉네임</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: TSearchDataForTable) => (
                  <StyledTableRow key={row.email}>
                    <StyledTableCell component="th" scope="row" width="40"><Avatar src={row.img_main_url}/></StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.nick_name}</StyledTableCell>
                    <StyledTableCell align="right"><Button variant="contained">친구요청</Button></StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{width: {sm: `calc(100% - ${60}px)`} }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={searchData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </div>
    </>
  )
}