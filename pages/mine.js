import React from 'react';
import Content from '../components/primitives/Content';
import Box from '../components/primitives/Box';
import {inject, observer} from 'mobx-react';
import styled from "styled-components";
import Avatar from "../components/primitives/Avatar";
import Row from "../components/primitives/Row";
import Hr from "../components/primitives/Hr";
import Slots from "../components/primitives/Slots";
import Button from "../components/primitives/Button";
import Page from "../components/hoc/page";

import Link from 'next/link'
import {observable} from "mobx";


const User = styled.div`
  display: flex;
  justify-content: space-between ;
`;
const Owner = styled.div`
  color:#FF4185;  
  font-size: 12px;
  
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding-left: 6px;
`;
const Number = styled.span`
  font-size: 24px;
`;
const Dis = styled.span`
  text-align: center;
`;

const Top = styled.div`
  width: 40%;
  align-self: center;
  position: relative;
`;

@inject('global')
@observer
class Mine extends React.Component {
  watchId;
  @observable show = false;

  componentDidMount() {
    this.props.global.currentMine = this.props.url.query.id;
    // TODOmine, clan, hero

    // this.watchId = setInterval(() => {
    //   this.props.global.fetchMine()
    // }, 1000)

    setTimeout(() => {
      this.show = this
    }, 100)
  }

  componentWillUnmount() {
    clearInterval(this.watchId)
  }

// {
//   "clan": {
//     "id": null,
//     "img": null,
//     "name": null
//   },
//   "hero": {
//     "id": null,
//     "name": null
//   },
//   "mine": {
//     "army": [],
//     "id": "ae86babc-09ee-477d-8d31-2ffe10f8c04d",
//     "img": "",
//     "location": {
//       "lat": 55.826714,
//       "lng": 37.571854
//     },
//     "name": "Hotel",
//     "production": {
//       "freq": 400,
//       "qty": 45
//     }
//   }
// }

  renderUnits(army = []) {
    if (army.length) {

      return army.map(unit => {

        return <Slots data={  unit } />
      })

    } else {
      return this.props.global.unitsAll.map(unit => {

        return <Slots data={  { unit} } />
      })
    }
  }

  render() {
    const { mine: { mine = {}, clan = {}, hero = {} }, mineIsClose, mineIsAlly } = this.props.global

    let attac = 0;
    let health = 0;

    if (mine.army && mine.army.length) {
      mine.army.forEach(item => {
        attac += item.unit.attack * item.qty;
        health += item.unit.health * item.qty;
      })
    }
    if (!this.show) {
      return null
    }
    return <Content>
      <Box style={ {
        marginTop: 20
      } }>
        <Row style={ {
          marginBottom: 30
        } }>
          { hero.name ?
            <Top>
              <User>
                <div>
                  <Owner>Owner</Owner>
                  { hero.name }
                </div>
                { hero.img && <Avatar src={ hero.img } width={ 45 } height={ 45 } style={ {
                  marginRight: -30
                } } /> }
              </User>
            </Top>

            : <Top>{ ' ' }</Top> }
          { mine.img ?
            <Avatar
              src={ mine.img }
              width={ 130 }
              height={ 130 }
              style={ {
                marginTop: -30,
                marginBottom: -30
              } } /> : <Top>{ ' ' }</Top> }
          { mine && mine.name ?
            <Top>
              <Name>{ ' ' }{ mine.name }</Name> </Top> : <Top /> }

        </Row>
        <Hr />
        <Row>
          { mine.supply ?
            <Dis>
              <Number>{ mine.supply }</Number>
              <div>
                Coins
              </div>
            </Dis> : null
          }
          { mine.production && mine.production.freq && mine.production.qty ? <Dis>
            <Number>{ mine.production.qty }</Number>con/h
            <div>
              Prodaction
            </div>
          </Dis> : null
          }
        </Row>
        <div>
          <Hr />
          <Row>
            <Dis>
              <Number>{ health || 0 }</Number>
              <div>
                Health
              </div>
            </Dis>
            <Dis>
              <Number>{ attac || 0 }</Number>
              <div>
                Attack
              </div>
            </Dis>
          </Row>
        </div>


      </Box>
      { mineIsAlly && mineIsClose ?
        <Link
          href={ '/mineAdd' }><Row>{ this.renderUnits(mine.army) }</Row></Link> :
        <Row>{ this.renderUnits(mine.army) }</Row> }

      <br />
      <br />
      { mineIsClose ? (
        mineIsAlly ?
          <Button onClick={ () => {
            this.props.global.fetchColect()
          } }>COLLECT</Button> :
          <Button onClick={ () => {
            this.props.global.fetchAtack()
          } }>ATTACK</Button>

      ) : <div style={ { textAlign: 'center', fontSize: 16, fontWeight: 'bold' } }>You are far away, come closer</div> }
    </Content>
  }

}

export default Page(Mine);
