import styled from "styled-components";
import {inject, observer} from "mobx-react";


const Wrap = styled.div`
  position: absolute;
  z-index: 1; 
  top: 0;
  left: 0;
  right: 0;
  background-color:#EF7708;
  height: 87px;
  display: flex;
  justify-content: space-around;
  font-size: 18px;
  font-weight: bold;
  align-content: center;
  flex-wrap: wrap;
  >div{
  width: 30%;
  align-self: center;
  }
  
`

const Coin = styled.div`
  display: inline-block;
  border-radius: 100%;
  background-color:#FDFC47;
  border:5px solid #F5AF19;
  width: 18px;
  height: 18px;
      box-sizing: content-box;
      vertical-align: middle;
  
`
const Avatar = styled.img`
  display: inline-block;
  border:5px solid #fff;
  width: 65px;
  height: 65px;
  float: right;
  border-radius: 1000px;
  
`
@inject('global')
@observer
export default class Header extends React.Component {

  render() {
    return <Wrap>
      <div>
        <Coin /> { this.props.global.heroes.balance }
      </div>
      <div>
        { this.props.global.heroes.name }
      </div>

      <div>
        <Avatar src={ this.props.global.heroes.img } />
      </div>
    </Wrap>
  }

}

