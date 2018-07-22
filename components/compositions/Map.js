import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {Map as MapYandex, Placemark, YMaps} from 'react-yandex-maps';
import styled from "styled-components";
import {action, observable, toJS} from "mobx";
import getClanImg from "../../utils/getClanImg";
import Router from 'next/router'
import Header from "../primitives/Header";

const Wrap = styled.div`
 position: absolute;
 width: 100%;
 height: 100%;
 
 &:before{
 content: ''; 
 background: url("/static/map-1.png");
 top: 0;
 bottom: 0;
 left: 0;
 right: 0;
 background-size: cover;
 background-position:50% 50%;
 }
`;


@inject('global')
@observer
export default class Map extends React.Component {
  YMap;
  ymap;
  userPoint;
  userCircle;
  @observable position = null;

  componentWillUnmount() {
    clearInterval(this.watchID)
  }

  handlerOnAvailable = (YMap) => {
    this.YMap = YMap;
  }

  handlerRef = (ymap) => {
    if (ymap) {

      this.ymap = ymap;
      this.ymap.behaviors.disable('scrollZoom');
      this.ymap.behaviors.disable('dblClickZoom');
      this.ymap.behaviors.disable('multiTouch');
      this.ymap.behaviors.disable('drag');

      this.init()
    }
  }

  init() {
    const geolocation = this.YMap.geolocation

    this.userPoint = new this.YMap.Circle([toJS(this.props.global.position) || [55.751574, 37.573856], 10], {}, {
      fillColor: "#fff",
      strokeColor: "#FF4182",
      strokeOpacity: 1,
      fillOpacity: 0.5,
      strokeWidth: 3
    });


    this.userCircle = new this.YMap.Circle([
      // Координаты центра круга.
      toJS(this.props.global.position) || [55.751574, 37.573856],
      // Радиус круга в метрах.
      100
    ], {}, {
      strokeColor: "#1C03B3",
      strokeOpacity: 0.8,
      fillOpacity: 0,
      strokeWidth: 1
    });
    this.ymap.geoObjects.add(this.userCircle);
    this.ymap.geoObjects.add(this.userPoint);

    this.checkClose();

    geolocation.get({
      provider: 'bower',
    }).then((result) => {
      this.props.global.position = result.geoObjects.position

      this.userPoint.geometry.setCoordinates(toJS(this.props.global.position));
      this.userCircle.geometry.setCoordinates(toJS(this.props.global.position));

    });


    this.watchLocation()
  }

  watchLocation() {
    // обновляем локацию
    var options = {
      enableHighAccuracy: true,
      timeout: 100,
      maximumAge: 0
    };

    const success = (pos) => {
      let crd = pos.coords;
      if (this && this.ymap) {
        try {
          this.userPoint.geometry.setCoordinates([crd.latitude, crd.longitude]);
          this.userCircle.geometry.setCoordinates([crd.latitude, crd.longitude]);
          this.ymap.setCenter([crd.latitude, crd.longitude], undefined, { duration: 250 });

          this.checkClose()
        } catch (e) {
          console.error('Lost context');
          clearInterval(this.watchID)
        }

      } else {
        console.error('Lost context');
        clearInterval(this.watchID)
      }
    };

    function error(err) {
      // console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    this.watchID = setInterval(() => {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }, 400)
  }

  @action
  checkClose() {
    this.props.global.mineClose = [];
    for (let i = 0; i < this.props.global.mineAll.length; i++) {
      const mine = this.props.global.mineAll[i];
      const result = this.userCircle.geometry.contains([mine.mine.location.lat, mine.mine.location.lng]);
      if (result) {
        this.props.global.mineClose.push(mine.mine.id)
      }
    }
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
//   "mineAll": {
//     "army": [
//       {
//         "qty": 2,
//         "unit": {
//           "attack": 10,
//           "health": "120",
//           "id": "7721987d-d224-456f-924a-42f097e25fc3",
//           "img": "https://i.pinimg.com/originals/d7/18/93/d718936589b73c228f7f71c19d6c8d34.jpg",
//           "name": "Archer",
//           "price": 75
//         }
//       }
//       ],
//     "id": "8baa1c88-d073-42ba-9415-34e64527e7df",
//     "img": "",
//     "location": {
//       "lat": 55.82599,
//       "lng": 37.56883
//     },
//     "name": "Dixy",
//     "production": {
//       "freq": 400,
//       "qty": 45
//     }
//   }
// }
  renderMine() {
    return this.props.global.mineAll.map((item) => {
      const img = getClanImg(item.clan, 'main');
      return <Placemark
        geometry={ { coordinates: [item.mine.location.lat, item.mine.location.lng], } }
        instanceRef={ (ref) => {
          if (ref) {
            ref.events.add('click', () => {
              Router.push({
                pathname: '/mine',
                query: { id: item.mine.id }
              })
            })
          }
        } }
        options={ {
          iconLayout: 'default#image',
          iconImageHref: img,
          iconImageSize: [31, 32],
          iconImageOffset: [-3, -42],
        } }
        properties={ {} }
        key={ item.mine.id }
      />


    })
  }

  render() {
    return <Wrap>
      <Header/>
      <YMaps
        onApiAvaliable={ this.handlerOnAvailable }>
        <MapYandex
          instanceRef={ this.handlerRef }
          state={ {
            center: this.props.global.position || [55.751574, 37.573856],
            zoom: 16,
            controls: []
          } }
          width={ '100%' } height={ '100%' }>
          { this.renderMine() }
        </MapYandex>

      </YMaps>
    </Wrap>
  }

}
