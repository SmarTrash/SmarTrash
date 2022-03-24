import { Text, TouchableOpacity, View,StyleSheet} from 'react-native';
import React from 'react'
import COLORS from '../../consts/colors';

const CategoryList = ({navigation}) => {
    const categories =[ 'ביגוד', 'נוי','בית','פנאי','הכל'];
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    


    return (
      
        categories.map((item, index) => (
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
                    width: 30,
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
    },
});
export default CategoryList