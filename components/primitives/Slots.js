import * as React from 'react';
import styled from "styled-components";

const Wrap = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  margin-bottom: 30px;
  border-radius: 50%;
  text-align: center;
  img {
    border-radius: 50%;    
    width: 100%;
    height: 100%;
  }
`

const Count = styled.div`
  line-height: 23px;
  vertical-align: middle;
  border-radius: 40px;
  position: absolute; 
  font-size: 10px;
  background-color:#000;
  color:#fff;
  width: 23px;
  height: 23px;
  right: 0;
  bottom: 0;  
`

const Name = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  font-size: 12px;
  text-transform: uppercase;
  padding-top: 5px;
`

export default class Slots extends React.Component {

  render() {
    const { unit: { name, img, } = {}, qty } = this.props.data
    return <Wrap>
      { img && <img src={ img } alt="" /> }
      { name && <Name>{ name }</Name> }
      <Count>{ qty ? qty : 0 }</Count>
    </Wrap>
  }

}
