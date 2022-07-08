import React, { useContext,PureComponent } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import COLORS from "../Consts/colors";
import Constants from './Constants';
// import { GlobalContext } from '../../../GlobalContext/GlobalContext'

// const { donePlay, setDonePlay} = useContext(GlobalContext);
const RADIUS = Constants.RADIUS;
class OurItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      this.setState({ item: this.props.item });
    }
  }

  render() {
    const x = this.props.position[0] - RADIUS / 2;
    const y = this.props.position[1] - RADIUS / 2;
    let item = this.state.item;
    let img;
    switch (item) {
      case 'apple':
        img = require('../../assets/apple.png');
        break;
      case 'banana':
        img = require('../../assets/banana.png');
        break;
      case 'can':
        img = require('../../assets/can.png');
        break;
      case 'champagne':
        img = require('../../assets/champagne.png');
        break;
      case 'milk-box':
        img = require('../../assets/milk-box.png');
        break;
      case 'newspaper':
        img = require('../../assets/newspaper.png');
        break;
      case 'plastic-bottle':
        img = require('../../assets/plastic-bottle.png');
        break;
      default:
        img = require('../../assets/newspaper.png');
    }
    //img = require('../../assets/'+item+'.png'); -> should get rid of the long switch!

    return (
      <Image  source={img} key={this.props.item} style={[styles.item, { left: x, top: y }]}/>
    );
  }
}

class Bin extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const x = this.props.position[0] - RADIUS / 2;
    const y = this.props.position[1] - RADIUS / 2;
    let c = this.props.category;
    let img;
    let styleComponent = styles.bin;
    if (c == "paper")
      img = require('../../assets/bin_paper.png');
    else if (c == "glass")
      img = require('../../assets/bin_glass.png');
    else if (c == "organic")
      img = require('../../assets/bin_organic.png');
    else if (c == "plastic")
      img = require('../../assets/bin_plastic.png');
    else if (c == "cloud") {
      img = require('../../assets/cloud.png');
      styleComponent = styles.cloud;
    }
    else if (c == "sun") {
      img = require('../../assets/sun.png');
      styleComponent = styles.sun;
    }
    else if (c == "mountain") {
      img = require('../../assets/mountain.png');
      styleComponent = styles.mountain;
    }
    else if (c == "trash")
      img = require('../../assets/bin_trash.png');

    return (
      <Image source={img} style={[styleComponent, { left: x, top: y }]}/>
    );

  }
}

class Timer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 30
    }
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }))
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval)
          this.props.onChange();
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }))
        }
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }

  render() {
    const { minutes, seconds } = this.state;
    return (
      <View>
        {minutes === 0 && seconds === 0
          ? <Text style={styles.busted}>נגמר הזמן!</Text>
          : <Text style={styles.time}>זמן שנותר: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>  
        }
      </View>
    )
  }
}


class Floor extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const x = this.props.position[0] - RADIUS / 2;
    const y = this.props.position[1] - RADIUS / 2;
    let c = this.props.category;
    let img;
    // img = require('../../assets/floor2.png');
    return (
      <Image source={img} style={[styles.floor, { left: x, top: y }]} />
    );
  }
}
const styles = StyleSheet.create({
  bin: {
    borderRadius: RADIUS * 2,
    width: RADIUS * 3.5,
    height: 150,
    position: "absolute",
    resizeMode: 'contain',
    marginTop:10
  },
  item: {
    borderRadius: RADIUS * 2,
    borderColor: 'black',
    width: RADIUS * 2,
    height: RADIUS * 2,
    resizeMode: 'contain',
    position: "absolute",
    zIndex: 999
  },
  time: {
    fontSize: 40,
    color: COLORS.black,
    textShadowColor: 'black',
    textShadowRadius: 4,
    fontFamily: 'Futura',
    textAlign: "center",
  },
  busted: {
    fontSize: 30,
    color: COLORS.red,
    fontFamily: 'Futura',
    textAlign: "center",
  },
  floor: {
    //alignSelf: 'stretch'
    width: '100%',
    marginHorizontal: 0,
    resizeMode: 'stretch'
  },
  cloud: {
    width: null,
    resizeMode: 'contain',
    height: 60
  },
  mountain: {
    opacity: 50,
    width: null,
    resizeMode: 'contain',
    height: 60
  },
  sun:{
    width: null,
    resizeMode: 'contain',
    height: 60
  }
});

export { OurItem, Bin, Timer, Floor };
