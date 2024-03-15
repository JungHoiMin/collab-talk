import {EventSourcePolyfill} from "event-source-polyfill";
import {store} from "@stores/Store";
import {increaseBadge, increaseRequestFriend, pushAlarmList} from "@stores/AlarmSlice";

export const getSseConnection = (target: string) => {
  const token = store.getState().userInfo.token || ''

  const sseConnection = new EventSourcePolyfill(`http://19.19.20.49:8080/api/custom-sse/${target}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })

  sseConnection.onopen = (ev) => {
    console.log('SSE 연결 완료.', ev)
  }

  sseConnection.onmessage = (ev) => {
    const data = JSON.parse(ev.data);
    console.log(data);

    store.dispatch(increaseBadge());
    if (data.evt === 'request-friend') {
      const requestor = data.body.requestor;
      const alarm = data.body.alarm;
      store.dispatch(pushAlarmList(alarm));
      store.dispatch(increaseRequestFriend());
    }
  };

  sseConnection.onerror = (ev) => {
    console.log('SSE 에러발생', ev)
  }

  return sseConnection;
}