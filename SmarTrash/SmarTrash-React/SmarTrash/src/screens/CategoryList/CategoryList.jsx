import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react'
import COLORS from '../../Consts/colors';

const apiUrlAll = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/GetAllGifts';
const apiUrlGetCategory = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/GetAllCategoryGifts';
const apiUrlGetSpesificCategory = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/GetGiftsByCategory/';
const CategoryList = (props) => {

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    GetCategory();
  }, []);
  const GetCategory = () => {
    fetch(apiUrlGetCategory, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => { return response.json() })
      .then(data => {
        setCategory(data)
      });
  }

  const GetSpesificCategory = (index) => {
    if (index === 1) {
      fetch(apiUrlAll, {
        method: 'GET',
        headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset-UTF-8'

        })
      }).then(response => { return response.json() })
        .then(data => {
          props.func(data);
        });
    } else {
      fetch(apiUrlGetSpesificCategory + index, {
        method: 'GET',
        headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset-UTF-8'
        })
      }).then(response => { return response.json() })
        .then(data => {
          props.func(data)
        });
    }
  }

  return (
    category.map((item) => (
      <TouchableOpacity
        key={item.CategoryId}
        activeOpacity={0.8}
        onPress={() => { setSelectedCategoryIndex(item.CategoryId), GetSpesificCategory(item.CategoryId) }}>
        <View>
          <Text
            style={{
              ...style.categoryListText,
              color:
                selectedCategoryIndex == item.CategoryId
                  ? COLORS.primary
                  : COLORS.grey,
            }}>
            {item.CategoryName}
          </Text>
          {selectedCategoryIndex == item.CategoryId && (
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
    padding: 10
  },
});
export default CategoryList