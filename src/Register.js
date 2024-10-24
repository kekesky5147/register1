import { useState, useEffect, useReducer, useRef } from 'react'
import {
  faCheck,
  faTimes,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// 소문자 혹은 대문자로 시작하고,3~23의 소문자 혹은 대문, 대쉬 혹은 아랫줄 사용 정규식
const USER_REGEX = /^[a-zA-Z][z-aA-Z0-9-_]{3,23}$/
// 비밀번호는 소문자, 대문자, 특수문자  각 1개씩 필요하며 8~24자 까지 가능한 정규식
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const Register = () => {
  const useRef = useRef() // 사용자 입력에 관한 수행, 구성요소가 로드 될 때 사용자 입력에 초점

  const errRef = useRef() //   오류 참조를 위한, 오류가 발생하면 입력해야 함

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validpwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  //   구성요소가 로드될때 포커스를 설정하는데 사용, array가 비어있음으로 구성요소가 로드되고 해당 사용자 이름 입력에 초점을 설정
  useEffect(() => {
    userRef.current.focus()
  }, [])

  //   사용자 이름에 대한 유효성 검사, 유저가 array에 있음으로 변경될때마다 해당 필드의 유효성 검사 실시. 결과를 콘솔에 기록하여 true, false판단.
  useEffect(() => {
    const result = USER_REGEX.test(user)
    console.log(result)
    console.log(user)
    setValidName(result)
  }, [user])
  //   사용자 비밀번호에 대한 유효성 검사, pwd가 array에 있음으로 변경될때마다 해당 필드의 유효성 검사 실시. 결과를 콘솔에 기록하여 true, false판단.
  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    console.log(result)
    console.log(pwd)
    setValidName(result)
    //
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, matchPwd])

  return (
    <section>
      {/* 오류 메세지가 존재하면 삼항 문을 사용해서 표시할 클래스 오류 메세지 전달, 그렇지 않을 경우 전체를 가져오는 클래스 오프스크린을 적용  */}
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live='assertive'
      >
        {errMsg}
      </p>
      <h1>Register</h1>
      <form>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          ref={userRef}
          autoComplete='off'
          onChange={e => setUser(e.target.value)}
          required
          aria-invalid={validName ? 'false' : 'true'}
          aria-describedby='uidnote'
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />

        <p
          id='uidnote'
          className={
            userFocus && user && !validName ? 'instructions' : 'offscreen'
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.
          <br />
          must begin with a letter. <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
      </form>
    </section>
  )
}

export default Register
