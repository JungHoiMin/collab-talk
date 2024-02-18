import "@pages/home/Home.css"
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import logo from "@images/logo.png";
import default_profile from "@images/default-profile.png";
import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@hooks/hooks";
import {clearUserInfo} from "@stores/UserInfoSlice";
import {Link, useNavigate} from "react-router-dom";
import {loadImageSourceByEmail} from "@apis/home/HomeApi";
import {setAuthorizationToken} from "@apis/AxiosInstance";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import useToggleState from "@hooks/ToggleState";
import {CTAlarmDialog} from "@components/CTAlarmDialog";
import {clearAlarm, setBadge} from "@stores/AlarmSlice";
import {store} from "@stores/Store";

const settings = [
  { label: 'profile', value: '프로필' },
  { label: 'account', value: '계정' },
  { label: 'logout', value: '로그아웃' },
]

export const CTTitleBar = () => {
  const email = useAppSelector((state) => state.userInfo.email);
  const badge = useAppSelector((state) => state.alarm.badge);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [imageUrl, setImageUrl] = useState<null | string>(null);
  const [alarmDialogToggle, , onClickAlarmDialogToggle] = useToggleState(false)

  useEffect(() => {
    if (store.getState().alarm.badge === 0){
      const sessionBadge = +(sessionStorage.getItem('badge') || 0)

      if (sessionBadge > 0) {
        store.dispatch(setBadge(sessionBadge))
      }
    }
  }, []);

  const onClickOpenUserMenu = useCallback((e: any) => {
    setAnchorElUser(e.currentTarget);
  }, [])

  const onCloseUserMemu = useCallback((e: any, label: string) => {
    setAnchorElUser(null);
    switch (label) {
      case 'profile':
        break;
      case 'account':
        break;
      case 'logout':
        dispatch(clearUserInfo());
        dispatch(clearAlarm())
        setAuthorizationToken('');
        navigate('/auth/login')
        break;
    }
  }, []);

  useEffect(() => {
    loadImageSourceByEmail(email || sessionStorage.getItem('email') || '')
      .then((res) => {
        setImageUrl(res)
      }).catch((err) => {
        console.log(err)
    })
  }, [])

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${70}px)` },
        ml: { sm: `${70}px` },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/home" >
            <img className="ctTitleLogo" src={logo} alt="logo" />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton aria-label="alarm" onClick={onClickAlarmDialogToggle}>
              <Badge badgeContent={badge} color="secondary">
                {badge===0?<NotificationsNoneIcon/>:<NotificationsActiveIcon/>}
              </Badge>
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="더보기...">
              <IconButton onClick={onClickOpenUserMenu} sx={{ p: 0 }} >
                <Avatar alt="Profile-Image" src={imageUrl || default_profile} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt:'45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={onCloseUserMemu}
            >
              {settings.map(({label, value}) => (
                <MenuItem key={label} onClick={(e) => {onCloseUserMemu(e, label)}}>
                  <Typography textAlign="center">{value}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <CTAlarmDialog toggle={alarmDialogToggle} onClickToggle={onClickAlarmDialogToggle}/>
    </AppBar>
  )
}