import React from 'react';

import Page from '../components/hoc/page';
import Content from '../components/primitives/Content';
import Box from "../components/primitives/Box";
import Avatar from "../components/primitives/Avatar";
import {inject, observer} from 'mobx-react';
import Row from "../components/primitives/Row";
import styled from "styled-components";
import Slots from "../components/primitives/Slots";
import Link from "next/link";


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
  margin-top: 30px;
`;

@inject('global')
@observer
class profile extends React.Component {
  renderUnits() {

    if (this.props.global.heroes.army && this.props.global.heroes.army.length) {
      return this.props.global.heroes.army.map(unit => {
        return <Slots data={ unit } />
      })
    } else {
      return this.props.global.unitsAll.map(unit => {
        return <Slots data={ { unit } } />
      })
    }
  }

  render() {
    return <Content>
      <Box style={ { marginTop: 40 } }>
        <div style={ { textAlign: 'center' } }>
          <Avatar src={ this.props.global.heroes.img } style={ {
            width: 100,
            height: 100,
            marginTop: -60,
            marginBottom: 10
          } } />
          <div style={ {
            fontSize: 16
          } }>
            <Name>{ this.props.global.heroes.name }</Name>
            <br />
            <Row>
              <Dis>
                <Number>{ this.props.global.heroes.balance }</Number>
                <div>
                  Coins
                </div>
              </Dis>
              <Dis>
                <Number>{ this.props.global.health || 0 }</Number>
                <div>
                  Health
                </div>
              </Dis>
              <Dis>
                <Number>{ this.props.global.attac || 0 }</Number>
                <div>
                  Attack
                </div>
              </Dis>
            </Row>
          </div>
        </div>
        <br />
        <Link href={ '/shop' }><Row>{ this.renderUnits() }</Row></Link>
      </Box>
    </Content>
  }

}

export default Page(profile);
