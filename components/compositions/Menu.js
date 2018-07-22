import * as React from 'react';
import styled from "styled-components";
import Link from 'next/link'


const Wrap = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color:#000;
  display: flex;
  padding-top: 6px;
  justify-content: space-around;
 
`;

const Item = styled.div`
  text-align: center;
  cursor:pointer;  
  & div {
  text-align: center;
  }  
`;


export default class Menu extends React.Component {

  render() {
    return <Wrap>
      <Link href={ '/' }>
        <Item>
          <img src="/static/Map.svg" alt="" />
          <div>
            Map
          </div>
        </Item>
      </Link>
      <Link href={ '/profile' }>
        <Item>

          <img src="/static/Profile.svg" alt="" />
          <div>
            Profile
          </div>
        </Item>
      </Link>
      <Link href={ '/shop' }>
        <Item>
          <img
            src="/static/Shop.svg"
            alt="" />
          <div>
            Shop
          </div>
        </Item>
      </Link>
      <Link href={ '/clan' }>
        <Item>
          <img src="/static/Clan.svg" alt="" />
          <div>
            Clan
          </div>
        </Item>
      </Link>

    </Wrap>
  }

}
