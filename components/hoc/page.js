// The Page Hoc used to wrap all our Page components.
// It serves 3 main purposes :
// 1. Handles global styling
// 2. Handles global layout
// 3. Construct and provide the Mobx stores

import React from 'react';
import Head from 'next/head';
import {Provider} from 'mobx-react';
import {ThemeProvider} from 'styled-components';

import App from '../primitives/App';

import globalStyle from '../../utils/globalStyle';
import Stores from '../../stores/index.js';
import Map from "../compositions/Map";
import Menu from "../compositions/Menu";

export default ComposedComponent => class extends React.Component {
  static async getInitialProps(ctx) {
    const isServer = !!ctx.req;

    if (isServer === true) {
      // const User = Stores('_userStore');
      // userState = User.getUserFromCookie(ctx.req);
    }

    return {
      isServer,
    };
  }

  constructor(props) {
    super(props);
    const stores = {}
    stores.global = Stores('_globalStore', stores);
    this.state = {
      stores
    };
  }

  componentDidMount() {
    this.state.stores.global.init()
  }

  render() {
    return (<Provider { ...this.state.stores } >
        <ThemeProvider theme={ {} }>

          <App bgColor="#fdfdfd">
            <Head>
              <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,700i|Roboto&amp;subset=cyrillic"
                    rel="stylesheet" />
              <style>
                { globalStyle }
              </style>
              <meta name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

            </Head>
            <ComposedComponent { ...this.props } />
            <Menu />
          </App>
        </ThemeProvider>

      </Provider>
    );
  }
};
