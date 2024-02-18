import React, {useEffect} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon, ListItemText, Typography
} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import {TAlarm, TAlarmType} from "@typings/states";
import {checkAlarm, setAlarmList} from "@stores/AlarmSlice";
import {store} from "@stores/Store";
import {useAppDispatch, useAppSelector} from "@hooks/hooks";
import {useNavigate} from "react-router-dom";

type Props = {
  toggle: boolean;
  onClickToggle: () => void;
}

export const CTAlarmDialog: React.FC<Props> = ({ toggle, onClickToggle }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  let alarmList: TAlarm[] = useAppSelector((state) => state.alarm.alarmList);

  const onClickAlarmItem = (idx: number, alarm: TAlarm) => {
    dispatch(checkAlarm(idx))
    onClickToggle();

    if (alarm.alarm_type === 'friend')
      navigate('/home/dm/addFrend')
  }

  useEffect(() => {
    const stateAlarmList = store.getState().alarm.alarmList;
    if (stateAlarmList.length === 0) {
      const sessionAlarmList = sessionStorage.getItem('alarmList');
      if (sessionAlarmList){
        const jsonAlarmList = JSON.parse(sessionAlarmList) as TAlarm[];
        if (jsonAlarmList.length > 0) {
          store.dispatch(setAlarmList(jsonAlarmList));
        }
      }
    }
  }, []);

  const getIconByAlarmType = (alarm_type: TAlarmType) => {
    if (alarm_type === 'server') {
      return (<SettingsIcon/>)
    }
    else if (alarm_type === 'friend') {
      return (<PersonAddIcon/>)
    }
  }
  return (
    <Dialog
      open={toggle}
      onClose={onClickToggle}
      scroll="paper"
      fullWidth

    >
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent dividers>
        <List sx={{width: '100%', bgcolor: 'background.paper'}}>
          {
            alarmList && alarmList.map((info, idx) => (
              <ListItem
                key={idx}
                alignItems="flex-start"
                sx={{bgcolor: `${info.is_check==='N'?'rgb(221,208,181)':'rgb(255,255,255)'}`, cursor: 'pointer'}}
                onClick={() => {onClickAlarmItem(idx, info)}}
              >
                <ListItemIcon>
                  {getIconByAlarmType(info.alarm_type)}
                </ListItemIcon>
                <ListItemText
                  primary={info.title}
                  secondary={
                    <Typography
                      sx={{display: 'inline'}}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >{info.detail}</Typography>
                  }
                ></ListItemText>
              </ListItem>
            ))
          }
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickToggle}>닫기</Button>
      </DialogActions>
    </Dialog>
  )
}