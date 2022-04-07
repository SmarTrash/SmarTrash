import { Text, TouchableOpacity, View,StyleSheet} from 'react-native';
import React, {useEffect,useState}from 'react'
import COLORS from '../../Consts/colors';
const apiUrlGetCategory = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/GetAllCategoryGifts';

const CategoryList = ({navigation}) => {

    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

    const [category, setCategory] = useState('');

    useEffect(() => {
    fetch(apiUrlGetCategory, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => { return response.json() })
      .then(data => {
        setCategory(data)
        console.log(data)
      });
    },[]);

    return (
      category.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View>
              <Text
                style={{
                  ...style.categoryListText,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.primary
                      : COLORS.grey,
                }}>
                {item}
              </Text>
              {selectedCategoryIndex == index && (
                <View
                  style={{
                    height: 3,
                    width: 70,
                    backgroundColor: COLORS.primary,
                    marginTop: 2,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
          
         
        ))
    
    );
  };

  const style = StyleSheet.create({
    categoryListText: {
        fontSize: 16,
        fontWeight: 'bold',
        padding:10
    },
});
export default CategoryList