import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createDictionaryFB, updateBucketFB } from "./redux/module/dictionary";
import { useHistory, useLocation } from "react-router-dom";

const AddDict = ({ match }) => {
  const dictInput = useRef();
  const furiganaInput = useRef();
  const dictKoInput = useRef();
  const exampleInput = useRef();
  const exampleKoInput = useRef();
  const location = useLocation();

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state !== undefined) {
      const { dict, furigana, dictKo, example, exampleKo } =
        location.state.selected_word;

      dictInput.current.value = dict;
      furiganaInput.current.value = furigana;
      dictKoInput.current.value = dictKo;
      exampleInput.current.value = example;
      exampleKoInput.current.value = exampleKo;
    }
  }, []);

  let typeTitle;
  if (match.params.type === "update") {
    typeTitle = "수정";
  } else {
    typeTitle = "추가";
  }

  const addDict = () => {
    const new_list_state = {
      dict: dictInput.current.value,
      furigana: furiganaInput.current.value,
      dictKo: dictKoInput.current.value,
      example: exampleInput.current.value,
      exampleKo: exampleKoInput.current.value,
    };

    if (match.params.type === "update") {
      let id = location.state.selected_word.id;
      dispatch(updateBucketFB(id, new_list_state));
    } else {
      dispatch(createDictionaryFB(new_list_state));
    }
    history.goBack();
  };

  return (
    <>
      <Title>단어 {typeTitle}하기</Title>
      <ContentBox>
        <Content>
          <ContentTitle>단어</ContentTitle>
          <ContentInput name="dict" ref={dictInput} />
        </Content>
        <Content>
          <ContentTitle>후리가나(히라가나로 입력해주세요)</ContentTitle>
          <ContentInput name="furigana" ref={furiganaInput} />
        </Content>
        <Content>
          <ContentTitle>뜻(한글)</ContentTitle>
          <ContentInput name="dictKo" ref={dictKoInput} />
        </Content>
        <Content>
          <ContentTitle>예문</ContentTitle>
          <ContentInput name="example" ref={exampleInput} />
        </Content>
        <Content>
          <ContentTitle>예문(한글)</ContentTitle>
          <ContentInput name="exampleKo" ref={exampleKoInput} />
        </Content>
      </ContentBox>
      <AddBtn
        onClick={() => {
          addDict();
        }}
      >
        {typeTitle}하기
      </AddBtn>
    </>
  );
};

const Title = styled.h4``;

const ContentBox = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  margin: 15px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:nth-child(odd) {
    margin: 20px 0;
  }
`;

const ContentTitle = styled.div`
  font-size: 0.8rem;
  text-decoration: underline;
`;

const ContentInput = styled.input`
  height: 30px;
  margin-top: 10px;
`;

const AddBtn = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 50px;
  background-color: purple;
  color: #fff;
  text-align: center;
  font-size: 30px;
  cursor: pointer;
  line-height: 50px;
  margin-top: 40px;
`;

export default AddDict;
