import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function Admin({ history,location }) {
  const [data, setData] = useState([]);
  const [time, setTime] = useState('');
  const [movieIdx, setMovieIdx] = useState('');
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContents, setNoticeContents] = useState('');

  const handlerTime = (e) => {
    setTime(e.target.value);
  }
  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      alert("로그인 후 이용해 주세요")
      history.push("/login");
      return;
    }




    const token = sessionStorage.getItem('token')
    const decode = jwtDecode(token);
  
    if (decode.sub != "test") {
      alert('잘못된 접근 입니다.');
      history.push('/')
    }
    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/movie`,)
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.log(error));

  }, []);
  const handlerMovie = (e) => {
    setMovieIdx(e.target.value)
  }

  const handlerSettingTime = (e) => {
    e.preventDefault();
    axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/inserttime`, { movieIdx, canReservationDate: time })
      .then(r => {
        if (r.data = 1) {
          alert("정상 처리 되었습니다.")
        }
      })
  }

  // FORM DATA를 저장할 상태 변수 
  // - INPUT, TEXTAREA 등 이용해서 입력
  // - 서버에서는 DTO 객체로 받아서 처리
  const [title, setUserId] = useState('TESTER');
  const [story, setUserName] = useState('테스터');
  const [opening, setUserEmail] = useState('tester@test.com');

  const handlerChangeUserId = e => setUserId(e.target.value);
  const handlerChangeUserName = e => setUserName(e.target.value);
  const handlerChangeUserEmail = e => setUserEmail(e.target.value);

  // 파일 선택창의 값을 직접 제어하기 위해서 사용  
  const inputFiles = useRef();

  // 파일 크기 및 개수 제한
  const MAX_FILE_SIZE = 1 * 1024 * 1024; //1MB
  const MAX_FILE_COUNT = 3;

  // 파일 종류, 크기, 개수 제한을 벗어나는 경우 메시지를 보여주고, 
  // 파일 입력창을 초기화하는 함수
  const isNotValid = msg => {
    alert(msg);
    inputFiles.current.value = '';
    setImageFiles([]);
  };

  // 업로드할 파일 데이터를 저장할 상태 변수와 이벤트 핸들러
  const [imageFiles, setImageFiles] = useState([]);

  const handleChangeFile = e => {
    const files = e.target.files;

    if (files.length > MAX_FILE_COUNT) {
      isNotValid("이미지는 최대 3개 까지 업로드가 가능합니다.");
      return;
    }
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.match("image/.*")) {
        isNotValid("이미지 파일만 업로드 가능합니다.");
        return;
      } else if (files[i].size > MAX_FILE_SIZE) {
        isNotValid("이미지 크기는 1MB를 초과할 수 없습니다.");
        return;
      }
    }

    setImageFiles([...files]);
  };

  // FORM DATA를 저장할 상태 변수를 변수 이름: 값 형식으로 설정
  let datas = {
    title,
    story,
    opening
  };

  // 서버로 전달할 폼 데이터를 작성
  const formData = new FormData();
  formData.append(
    'data',
    new Blob([JSON.stringify(datas)], { type: 'application/json' })
  );
  Object.values(imageFiles).forEach(file => formData.append('files', file));

  // multipart/form-data 형식으로 서버로 전달
  const handlerUploadDataWithFile = () => {
    axios({
      method: 'POST',
      url: `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/insertmovie`,
      headers: { 'Content-Type': 'multipart/form-data;' },
      data: formData
    })
      .then(response => {
        console.log(response);
        alert(`${response.data}\n정상적으로 업로드했습니다.`);
      })
      .catch(error => {
        console.log(error);
        alert(`업로드 중 오류가 발생했습니다.`);
      });
  };
  const handlerDelete = (e) => {
    e.preventDefault();
    axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/deletemovie`, { movieIdx })
      .then(r => {
        if (r.data = 1) {
          alert("삭제 되었습니다.")
        }
      })
  }
  const handlerNoticeTitle = (e) => {
    setNoticeTitle(e.target.value)
  }
  const handlerNoticeContents = (e) => {
    setNoticeContents(e.target.value)
  }

  const handlerInsertNotice = (e) => {
    e.preventDefault();
    axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/insertannouncement`, { "title": noticeTitle, "contents": noticeContents })
      .then(r => {
        if (r.data = 1) {
          alert("정상 처리 되었습니다.")
        }
      })
  }
  return (
    <>
      {/* 여기가 영화 집어넣는곳  */}
      <div>
        제목: <input type="text" value={title} onChange={handlerChangeUserId} />
      </div>
      <div>
        줄거리: <input type="text" value={story} onChange={handlerChangeUserName} />
      </div>
      <div>
        개봉일: <input type="text" value={opening} onChange={handlerChangeUserEmail} />
      </div>
      <div>
        FILES: <input type="file" ref={inputFiles} onChange={handleChangeFile} multiple accept="image/*" />
      </div>
      <div>
        <button type="button" onClick={handlerUploadDataWithFile}>업로드</button>
      </div>
      <div>
        ------------여기 부터 영화 삭제---------------------
        <br />
        <select onChange={handlerMovie} style={{ outlineStyle: "none" }} >
          <option value="" disabled selected>영화 선택</option>
          {
            data.map(a => (
              <option value={a.movieIdx} >{a.title}</option>
            ))
          }
        </select>
        <br />
        <button type="button" onClick={handlerDelete}>영화 삭제</button>
      </div>
      <div>
        -----------여기 부터 영화 시간 등록-----------------------
        <br />
        <select onChange={handlerMovie} style={{ outlineStyle: "none" }} >
          <option value="" disabled selected>영화 선택</option>
          {
            data.map(a => (
              <option value={a.movieIdx} >{a.title}</option>
            ))
          }
        </select>
        <br />영화 시간
        <input value={time} onChange={handlerTime}></input>
        <br />
        <button type="button" onClick={handlerSettingTime}>영화 시간 등록</button>
      </div>
      <div>
        ----------여기 부터 공지사항 등록---------------
        <br />제목
        <input type="text" value={noticeTitle} onChange={handlerNoticeTitle}></input>
        <br />본문
        <input type="text" value={noticeContents} onChange={handlerNoticeContents}></input>
        <br />
        <button type="button" onClick={handlerInsertNotice}>공지 등록</button>
      </div>
    </>
  );
}

export default Admin;