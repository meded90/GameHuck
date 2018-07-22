import React from 'react';

import Page from '../components/hoc/page';
import Content from '../components/primitives/Content';
import Box from "../components/primitives/Box";
import Row from "../components/primitives/Row";
import styled from "styled-components";

const ProgressWrap = styled.div`
  height: 50px;
  width: 100%;
  overflow: hidden;
  border-radius: 100px;
  &:after{
    content: '';
    display: table;
  }
`
const ProgressLeft = styled.div`
  float:left;
  width: 37%;
  height: 100%;
  font-size: 24px;
  font-weight: bold;
    text-align: center;


   background: linear-gradient(#4511BF, #6D41DE);
   &:before{
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
`
const ProgressRight = styled.div`
  float:right;
  width: 63%;
  height: 100%;
  text-align: center;
  background: linear-gradient(#F36715, #F5AF19);
  font-size: 24px;
  font-weight: bold;
  &:before{
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
`
const Table = styled.div`

  font-size: 16px;
  font-weight: bold;
  line-height: 2;

`

const Index = () => <Content>
  <Box>
    <Row>
      <h2>
        Human
      </h2>
      <h2>
        Creatures
      </h2>
    </Row>
    <ProgressWrap>
      <ProgressLeft>
        37%
      </ProgressLeft>
      <ProgressRight>
        63%
      </ProgressRight>
    </ProgressWrap>

    <br />
    <br />
    <Row>
      <Table>

        <div>1) Игрок 1</div>
        <div>2) Игрок 2</div>
        <div>3) Игрок 3</div>
      </Table>
      <Table>

        <div>1) Игрок 4</div>
        <div>2) Игрок 5</div>
        <div>3) Игрок 6</div>
      </Table>
    </Row>
  </Box>

</Content>;

export default Page(Index);
