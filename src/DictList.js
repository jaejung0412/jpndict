import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "@material-ui/core";
import { loadDictionaryFB, deleteBucketFB } from "./redux/module/dictionary";
import { useHistory } from "react-router-dom";

const DictList = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  console.log("asdasdasds");
  //   dispatch(loadDictionaryFB());

  const dic_list = useSelector((state) => state.dictionary.list);

  console.log("dic_list : ", dic_list);

  const deleteWord = (id) => {
    console.log("id : ", id);
    dispatch(deleteBucketFB(id));
  };

  useEffect(() => {
    dispatch(loadDictionaryFB());
  }, []);

  const updateWord = (selected_id) => {
    const selected_word = dic_list.find(({ id }) => {
      return id === selected_id;
    });

    history.push({
      pathname: "/word/update",
      state: {
        selected_word: selected_word,
      },
    });
  };
  return (
    <>
      <Title>MY DICTIONARY</Title>
      {dic_list.length === 0 ? (
        <ContentBox>
          <Content>
            <ContentWord>
              현재 추가된 단어가 존재하지 않습니다.
              <br></br>
              오른쪽 플러스 버튼을 눌러 사전을 등록해주세요.
            </ContentWord>
          </Content>
        </ContentBox>
      ) : (
        dic_list.map((props, index) => {
          return (
            <ContentBox key={props.id}>
              <Content>
                <ContentTitle>단어</ContentTitle>
                <ContentWord>{props.dict}</ContentWord>
              </Content>
              <Content>
                <ContentTitle>후리가나</ContentTitle>
                <ContentWord>{props.furigana}</ContentWord>
              </Content>
              <Content>
                <ContentTitle>뜻(한글)</ContentTitle>
                <ContentWord>{props.dictKo}</ContentWord>
              </Content>
              <Content>
                <ContentTitle>예문</ContentTitle>
                <ContentWord color={"blue"}>{props.example}</ContentWord>
                <ContentTitle>예문(한국어)</ContentTitle>
                <ContentWord color={"blue"}>{props.exampleKo}</ContentWord>
                <ButtonGroup
                  color="primary"
                  aria-label="outlined primary button group"
                  style={{ position: "absolute", right: "20px", top: "20px" }}
                >
                  <Button
                    onClick={() => {
                      updateWord(props.id);
                    }}
                  >
                    수정
                  </Button>
                  <Button
                    onClick={() => {
                      deleteWord(props.id);
                    }}
                  >
                    삭제
                  </Button>
                </ButtonGroup>
              </Content>
            </ContentBox>
          );
        })
      )}
      <Link to="/word/add">
        <PlusBtn>+</PlusBtn>
      </Link>
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
  position: relative;
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

const ContentWord = styled.div`
  font-size: 1.1rem;
  color: ${(props) => (props.color ? "blue" : "black")};
`;

const PlusBtn = styled.div`
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 50%;
  color: #fff;
  position: absolute;
  right: 10px;
  bottom: 10px;
  line-height: 42px;
  text-align: center;
  font-size: 50px;
  cursor: pointer;
`;

export default DictList;
