export default `
  html, body, #__next {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif;
  }
  a {
    text-decoration: none;
    color: #009BFF;
  }
  a:hover {
    color: #777777;
  }
  [class*=map-copyrights-promo],
  [class*=copyright__link]{
    display: none !important;
  }
  [class*="ymaps-2"][class*="-ground-pane"] {
    /*filter: url("data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\'><filter id=\\'grayscale\\'><feColorMatrix type=\\'matrix\\' values=\\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\\'/></filter></svg>#grayscale");*/
     /*Firefox 3.5+ */
    -webkit-filter: hue-rotate(210deg) saturate(160%);
    /* Chrome 19+ & Safari 6+ */
    opacity: .6;
  }
  [class*="ymaps-2"][class*="-map-bg"] {
  content: ''; 
   background: url("/static/map-1.png");
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background-size: cover;
   background-position:50% 50%;
  }
  * {
    box-sizing: border-box;
  }
`;
