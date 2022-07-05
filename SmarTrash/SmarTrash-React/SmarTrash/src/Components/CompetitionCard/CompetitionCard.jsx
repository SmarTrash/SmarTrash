import { Dimensions, StyleSheet, Text, View} from 'react-native';
import React,{useContext} from 'react'
import COLORS from '../../Consts/colors';
import CoinIcon from '../Icon/CoinIcon';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'



const { width } = Dimensions.get('screen');
const cardWidth = width / 1.06;



const CompetitionCard = ({  usersPlaces }) => {
  const {userFirstName, userLastName,
} = useContext(GlobalContext);
  return (
  
    <View style={style.container}>
      <View style={[style.competitorCard,{ backgroundColor: usersPlaces["fullName"]==userFirstName+" "+userLastName ? '#e8ffef' : COLORS.white }]} >
            <View style={style.competitorCardContent}>
          <Text style={style.txtName}>
            {usersPlaces["fullName"]}
          </Text>
          <View style={{ flex: 1, }}>
            <Text style={style.txtPoint}>
              {usersPlaces["throws"]}
              {'  '}
              <CoinIcon />
            </Text>
          </View>

        </View>
      </View>
    </View>
  );
};


export default CompetitionCard;
const style = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  competitorCard: {
    height: 70,
    width: cardWidth,
    backgroundColor: COLORS.white,
    margin: 15,
    elevation: 15,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    marginRight: 30,
  },
  competitorCardContent: {
    flexDirection: 'row',
  },
  txtName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.green,
    alignSelf: 'flex-start',
    margin: 20,
  },
  txtPoint: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.green,
    alignSelf: 'flex-end',
    textAlign: 'left',
    margin: 20,
  },
});