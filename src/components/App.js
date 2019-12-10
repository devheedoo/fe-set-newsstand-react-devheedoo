import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import pressListData from '../api/pressListData';
import ListView from './Contents/ListView';
import CardView from './Contents/CardView';

// Container
const Container = styled.div`
  display: flex;
  background-color: pink;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

// Menubar (상단)
const Menubar = styled.div`
  display: flex;
  height: 50px;
  width: 780px;
  background-color: brown;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const PressFilter = styled.div`
  flex: 0 0 300px;
  background-color: gray;
`;

const ViewControl = styled.div`
  flex: 0 0 300px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: blue;
`;

const ViewType = styled.div`
  flex: 0 0 100px;
  background-color: green;
`;

const PrevNext = styled.div`
  flex: 0 0 100px;
  background-color: lightgreen;
  display: flex;
`;

const Prev = styled.div`
  flex: 0 0 45px;
`;

const Next = styled.div`
  flex: 0 0 45px;
`;


const LIST = 'LIST';
const CARD = 'CARD';

const App = props => {
  const [pressIndex, setPressIndex] = useState(0);
  const [viewType, setViewType] = useState(LIST);

  const pressIds = pressListData.map(press => press.id);

  const goToPrevPress = () => {
    if (pressIndex > 0) {
      setPressIndex(pressIndex - 1);
    } else {
      setPressIndex(pressIndex - 1 + pressIds.length);
    }
  }
  const goToNextPress = () => {
    if (pressIndex < pressIds.length - 1) {
      setPressIndex(pressIndex + 1);
    } else {
      setPressIndex(pressIndex + 1 - pressIds.length);
    }
  }

  const changeToCardView = () => {
    setViewType(CARD);
  };

  const changeToListView = () => {
    setViewType(LIST);
  };

  return (
    <Container>
      <Menubar>
        <PressFilter>
          PressFilter
        </PressFilter>
        <ViewControl>
          <ViewType>
            <button onClick={changeToCardView}>CARD</button>
            <button onClick={changeToListView}>LIST</button>
          </ViewType>
          <PrevNext>
            <Prev><button onClick={goToPrevPress}>Prev</button></Prev>
            <Next><button onClick={goToNextPress}>Next</button></Next>
          </PrevNext>
        </ViewControl>
      </Menubar>
      <Contents
        viewType={viewType}
        pressListData={pressListData}
        pressId={pressIds[pressIndex]}
      />
    </Container>
  );
};

// ContentsBox (하단)
const ContentsBox = styled.div`
  display: flex;
  width: 780px;
  height: 700px;
  background-color: orange;
  flex-direction: column;
  align-items: center;
`;

const Contents = (props) => {
  const {viewType, pressListData, pressId} = props;
  return (
    <ContentsBox>
      {viewType === LIST ? (
        <ListView
          pressListData={pressListData}
          pressId={pressId}
        />
      ) : null}
      {viewType === CARD ? (
        <CardView />
      ) : null}
    </ContentsBox>
  );
}

export default App;