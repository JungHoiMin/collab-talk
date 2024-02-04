import useInputState from "../../hooks/InputState";
import {useEffect} from "react";
import {axiosInstance} from "../../manager/AxiosInstance";

const Signup = () => {
  const [ email, setEmail, ] = useInputState('')
  const [ emailCheck, setEmailCheck, ] = useInputState(false)
  const [ password, setPassword, onChangePassword ] = useInputState('')
  const [ passwordCheck, setPasswordCheck, onChangePasswordCheck ] = useInputState('')
  const [ name, setName, onChangeName ] = useInputState('')
  const [ phoneNumber, setPhoneNumber, ] = useInputState('')
  const [ phoneNumberCheck, setPhoneNumberCheck, ] = useInputState(false)

  const onClickCheckEmailDuplicate = () => {
    if (email === '') {
      alert('이메일을 입력하세요');
      return;
    }
    axiosInstance.get(`/collaborator/check/email/${email}`)
        .then((res) => {
          if (res.data === true) alert('이미 사용중인 이메일 입니다.');
          setEmailCheck(!res.data);
        });
  }
  const onClickCheckPhoneNumberDuplicate = () => {
    if (phoneNumber === '') {
      alert('전화번호를 입력하세요');
      return;
    }
    axiosInstance.get(`/collaborator/check/phone_number/${phoneNumber}`)
        .then((res) => {
          if (res.data === true) alert('이미 사용중인 전화번호 입니다.');
          setPhoneNumberCheck(!res.data);
        });
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailCheck(false);
  }
  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    setPhoneNumberCheck(false);
  }

  const onClickSignup = () => {
    if (!emailCheck || !phoneNumberCheck) {
      alert('중복 체크를 해주세요');
      return;
    }

    if (password !== passwordCheck) {
      alert('비밀번호가 다릅니다.');
      return;
    }

    if (email === '' || password === '' || name === '' || phoneNumber === ''){
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
        })
        .catch((err) => {
          console.log(err)
        })
  }

  return (
      <div>
        <h1>회원가입 페이지</h1>
        <input placeholder="이메일" type="email" onChange={onChangeEmail} />
        <button disabled={emailCheck} onClick={onClickCheckEmailDuplicate}>이메일 중복 확인</button>
        
        <input placeholder="비밀번호" type="password" onChange={onChangePassword} />
        <input placeholder="비밀번호 확인" type="password" onChange={onChangePasswordCheck} />
        <input placeholder="이름" type="text" onChange={onChangeName} />
        <input placeholder="전화번호" type="tel" onChange={onChangePhoneNumber} />
        <button disabled={phoneNumberCheck} onClick={onClickCheckPhoneNumberDuplicate}>전화번호 중복 확인</button>
        <button onClick={onClickSignup}>회원가입</button>
      </div>
  )
}

export default Signup