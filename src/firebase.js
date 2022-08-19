// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// config 검증
const firebaseConfig = {
  apiKey: "AIzaSyC8gzy6hc_ftYmItuK1M3dqCJ_q9vL2zLw",
  authDomain: "sparta-react-basic-7845e.firebaseapp.com",
  projectId: "sparta-react-basic-7845e",
  storageBucket: "sparta-react-basic-7845e.appspot.com",
  messagingSenderId: "1008147289341",
  appId: "1:1008147289341:web:bb915b6468b3d53f8cda94",
  measurementId: "G-2JTL0FJWYP",
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };
