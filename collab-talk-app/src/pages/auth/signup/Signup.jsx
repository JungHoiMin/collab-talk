import "./Signup.css"
import imgLogo from "../../../images/logo.png"
import useInputState from "../../../hooks/InputState";
import {axiosInstance} from "../../../manager/AxiosInstance";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail,] = useInputState('');
  const [emailCheck, setEmailCheck,] = useInputState(false);
  const [password, setPassword,] = useInputState('');
  const [passwordCheck, setPasswordCheck,] = useInputState('');
  const [name, , onChangeName] = useInputState('');
  const [phoneNumber, setPhoneNumber,] = useInputState('');
  const [phoneNumberCheck, setPhoneNumberCheck,] = useInputState(false);
  const [mismatchError, setMismatchError] = useState(false);
  const [successSignup, setSuccessSignup] = useState(false);
  let [linkTime, setLinkTime] = useState(null);

  useEffect(() => {
    if (linkTime === null)
      return

    if (linkTime < 1) {
      onEvtLinkToLogin();
    } else{
      setTimeout(() => {
        setLinkTime(linkTime - 1)
      }, 1000)
    }
  }, [linkTime])

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
    setMismatchError(e.target.value !== passwordCheck)
  }, [passwordCheck]);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setMismatchError(e.target.value !== password)
  }, [password]);

  const onClickCheckEmailDuplicate = useCallback(() => {
    if (email === '') {
      alert('이메일을 입력하세요');
      return;
    }
    axiosInstance.get(`/collaborator/check/email/${email}`)
      .then((res) => {
        if (res.data === true) alert('이미 사용중인 이메일 입니다.');
        setEmailCheck(!res.data);
      });
  }, [email]);

  const onClickCheckPhoneNumberDuplicate = useCallback(() => {
    if (phoneNumber === '') {
      alert('전화번호를 입력하세요');
      return;
    }
    axiosInstance.get(`/collaborator/check/phone_number/${phoneNumber}`)
      .then((res) => {
        if (res.data === true) alert('이미 사용중인 전화번호 입니다.');
        setPhoneNumberCheck(!res.data);
      });
  }, [phoneNumber]);

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
    setEmailCheck(false);
  }, []);

  const onChangePhoneNumber = useCallback((e) => {
    setPhoneNumber(e.target.value);
    setPhoneNumberCheck(false);
  }, []);

  const onClickSignup = useCallback(() => {
    if (!emailCheck || !phoneNumberCheck) {
      alert('중복 체크를 해주세요');
      return;
    }

    if (password !== passwordCheck) {
      alert('비밀번호가 다릅니다.');
      return;
    }

    if (email === '' || password === '' || name === '' || phoneNumber === '') {
      alert('값을 입력하세요');
      return;
    }

    axiosInstance.post('collaborator/signup', {
      email,
      name,
      password,
      phone_number: phoneNumber
    })
      .then((res) => {
        console.log(res);
        setSuccessSignup(true);
        setLinkTime(5);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [email, name, password, phoneNumber, phoneNumberCheck, emailCheck, passwordCheck]);
  const onEvtLinkToLogin = () => {
    navigate('/auth/login');
  }

  return (
    <>
      <div className="ctSignupMain">
        <img className="ctLogo" src={imgLogo} alt="logo"/>
        <div>
          <TextField className="ctInput" variant="standard" label="이메일" type="email" onChange={onChangeEmail}/>
          <Button className="ctCheckButton" variant="contained" color="secondary"
                  disabled={emailCheck} onClick={onClickCheckEmailDuplicate}
          >중복 확인</Button>
        </div>
        <div>
          <TextField className="ctInput" variant="standard" label="비밀번호" type="password" onChange={onChangePassword}/>
        </div>
        <div>
          <TextField className="ctInput" variant="standard" label="비밀번호 확인" type="password"
                     onChange={onChangePasswordCheck}/>
        </div>
        <div>
          {mismatchError && <p className="ctWarningText">비밀번호가 일치하지 않습니다.</p>}
        </div>
        <div>
          <TextField className="ctInput" variant="standard" label="이름" type="text" onChange={onChangeName}/>
        </div>
        <div>
          <TextField className="ctInput" variant="standard" label="전화번호" type="text" onChange={onChangePhoneNumber}/>
          <Button className="ctCheckButton" variant="contained" color="secondary"
                  disabled={phoneNumberCheck} onClick={onClickCheckPhoneNumberDuplicate}
          >중복 확인</Button>
        </div>
        <div>
          <Button className="ctSubmitButton" variant="outlined" onClick={onClickSignup}>회원가입</Button>
        </div>
      </div>
      <Dialog open={successSignup}
              onClose={onEvtLinkToLogin}
      >
        <DialogTitle>회원가입에 성공했습니다.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            확인을 누르시거나 {linkTime}초 후에 로그인 페이지로 이동합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onEvtLinkToLogin} autoFocus>확인</Button>
        </DialogActions>
      </Dialog>
    </>

  )
}

export default Signup
