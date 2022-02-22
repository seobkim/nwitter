import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import "./styles.css";
ReactDOM.render(
  // CRA(Create React App)로 만든 리액프 프로젝트는 기본적으로 index.js 파일에 React.StrictMode를 설정함
  // 이 설정을 지우지 않으면 console.log 함수를 2번 실행되는 현상이 나타남
  // 개발상황에서 의도적으로 2번 호출하도록 만든 것
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
