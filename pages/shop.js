import React from 'react';

import Page from '../components/hoc/page';
import {inject, observer} from 'mobx-react';
import Content from "../components/primitives/Content";
import Box from "../components/primitives/Box";
import Row from "../components/primitives/Row";
import styled from "styled-components";
import {observable} from "mobx";
import ButtonSmall from "../components/primitives/ButtonSmall";

const Img = styled.img`
 width: 100px;
 height: 100px;
`

const Input = styled.input`
   background-color: transparent;
   border-radius: 60px;
   border:1px solid #fff;
   width: 60px;
   height: 30px;
   font-size: 16px; 
   outline: none;
   color:#fff;
   padding-right: 10px;
   padding-left: 10px;
   margin-top: 6px;
`


const ItemText = styled.div`
      width: 90%;
    padding-left: 20px;
    font-size: 16px;
    line-height: 1.3;
    h2{
      margin-bottom: 8px;
    }
`


@inject('global')
@observer
class Item extends React.Component {
  @observable value = 0;

  render() {
    const item = this.props.item
    let maxLeng
    try {
      maxLeng = this.props.global.heroes.army.find(army => army.unit.id === item.id).qty;
    } catch (e) {
      maxLeng = 0
    }
    return <Box>
      <Row>
        <div style={ { width: 100 } }>
          <Img src={ item.img } alt="" /> <br />
          <Row>

            <Input
              type='number'
              value={ this.value }
              min={ 0 }
              max={ maxLeng }
              onChange={ (e) => {
                this.value = e.target.value
              }
              } />

          </Row>
        </div>
        <ItemText>
          <h2 style={ { marginTop: 0 } }> { item.name } </h2>
          Attack: { item.attack } <br />
          Health: { item.health } <br />
          Price: { item.price } <br />
          <ButtonSmall
            onClick={ () => {
              try {
                const armyOld = this.props.global.mine.mine.army;
                const result = this.props.global.unitsAll.map(army => {
                  const old = armyOld.find(item => {
                    return item.unit.id === army.id
                  });

                  const result = {
                    unitId: army.id,
                    qty: 0
                  };

                  if (old) {
                    if (army.id === item.id) {
                      result.qty = Number(this.value) + old.qty;
                    } else {
                      result.qty = old.qty;
                    }
                  } else {
                    if (army.id === item.id) {
                      result.qty = Number(this.value);
                    }
                  }
                  return result
                })

                console.log(`!!!! mineAdd.js:96 \n result `, result, '\n !!!!');
                debugger;
                this.props.global.fetchAddInToMien(result)
              } catch (e) {
                console.error(e)
              }
            }
            }
          >ADD</ButtonSmall>
        </ItemText>
      </Row>
    </Box>
  }

}

@inject('global')
@observer
class mineAdd extends React.Component {

  render() {
    return <Content>
      <h2>Shop</h2>
      { this.props.global.unitsAll.map(item => {
        return <Item item={ item } key={ item.id } />
      }) }
    </Content>
  }

}

export default Page(mineAdd);
