import './App.css';
import axios from "axios";
import React, { useEffect, useState } from 'react';

const SERVER_URL = 'http://kangsungwoo.link/data'
//컴포넌트 분리.
//material ui
//에러핸들링
//폴더 test변경.
function App() {
  const [tableData, setTableData] = useState([]);
  const [isMod, setIsMod] = useState(false);
  let newData={}
  //마운트되면(처음 웹페이지 입장&새로고침)fetchData호출.
  useEffect(()=>{
    fetchData();
  },[])
  //db데이터를 요청하고, 그 값으로 tableData상태 갱신.
  const fetchData = async () => {
    try {
      const response = await axios.get(SERVER_URL);
      if(response){
        const data = response.data;
        setTableData(data);
      }
    } catch (err) {
      if (err.response) alert(err.response.data.message);
      else {
        console.log(err);
      }
    }
  }
  //초기화 버튼 누르면 서버에 db초기화 요청 & 테이블 갱신.
  const handleResetButton = async () => {
    try {
      await axios.post(SERVER_URL);
    } catch (err) {
      if (err.response) alert(err.response.data.message);
      else {
        console.log(err);
      }
    }
    await fetchData();
  }
  //수정완료 버튼누르면 _id와 수정할 속성을 가진 객체를 서버에 전송하여 해당 항목 수정 요청 & 테이블 갱신.
  const handleCompleteButton = async (_id) => {
    const pullData = {
      _id,
      data: newData,
    }
    try{
      await axios.patch(SERVER_URL, pullData)
      setIsMod(false);
    }catch(err){
      console.log(err);
    }
    await fetchData();
  }
  //input태그에 값을 입력하면 해당 셀의 컬럼을 속성으로 갖고 입력값을 속성값으로 갖는 객체 생성.
  const handleInputChange = (key, e) => {
    newData = {...newData,[key]:e.target.value}
    if(e.target.value===''){
      delete newData[key];
    }
  }
  //_id를 서버에 전송하여 해당 항목 삭제 요청 & 테이블 갱신.
  const handleDeleteButton = async (_id)=>{
    try{
      await axios.delete(SERVER_URL,{params:{_id}});
    }catch(err){
      console.log(err);
    }
    await fetchData();
  }
  return (
    <div className='App'>
      <div className='center-container'>
        <button onClick={handleResetButton}>초기화</button>
        <table border='1'>
          <thead>
            <tr>
              <th>수정/삭제</th>
              <th>guest_code</th>
              <th>guest_name</th>
              <th>guest_birth</th>
              <th>guest_hp</th>
              <th>guest_addr</th>
              <th>guest_mail</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                {isMod === index ? (<td>
                  <button onClick={() => { setIsMod(false) }}>수정취소</button>
                  <button onClick={() => { handleCompleteButton(item._id) }}>수정완료</button>
                </td>) :
                  (<td>
                    <button onClick={() => { setIsMod(index) }}>수정</button>
                    <button onClick={()=>{handleDeleteButton(item._id)}}>삭제</button>
                  </td>)}
                {isMod === index ? (<td><input type='text' placeholder={item.guest_code} onChange={(e) => handleInputChange('guest_code', e)} /></td>) :
                  (<td>{item.guest_code}</td>)}              
                {isMod === index ? (<td><input type='text' placeholder={item.guest_name} onChange={(e) => handleInputChange('guest_name', e)} /></td>) :
                  (<td>{item.guest_name}</td>)}
                {isMod === index ? (<td><input type='text' placeholder={item.guest_birth} onChange={(e) => handleInputChange('guest_birth', e)} /></td>) :
                  (<td>{item.guest_birth}</td>)}
                {isMod === index ? (<td><input type='text' placeholder={item.guest_hp} onChange={(e) => handleInputChange('guest_hp', e)} /></td>) :
                  (<td>{item.guest_hp}</td>)}
                {isMod === index ? (<td><input type='text' placeholder={item.guest_addr} onChange={(e) => handleInputChange('guest_addr', e)} /></td>) :
                  (<td>{item.guest_addr}</td>)}
                {isMod === index ? (<td><input type='text' placeholder={item.guest_mail} onChange={(e) => handleInputChange('guest_mail', e)} /></td>) :
                  (<td>{item.guest_mail}</td>)}
              </tr>)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
