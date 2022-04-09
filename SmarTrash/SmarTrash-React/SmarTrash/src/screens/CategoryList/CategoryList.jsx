import { Text, TouchableOpacity, View,StyleSheet} from 'react-native';
import React, {useEffect,useState}from 'react'
import COLORS from '../../Consts/colors';
const apiUrlAll = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/GetAllGifts';
const apiUrlGetCategory = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/GetAllCategoryGifts';
const apiUrlGetSpesificCategory='http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/GetGiftsByCategory/';
const CategoryList = (props) => {

    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [category, setCategory] = useState([]);
    const [giftDataByCategory, setGiftDataByCategory] = useState([]);
    const [tempData, setGtempData] = useState([]);
    useEffect(() => {
    //  GetSpesificCategory();
      GetCategory();
      }  ,[]);
    const GetCategory=()=>{
      fetch(apiUrlGetCategory,{
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
      
    
      const GetSpesificCategory=(index)=>{
        if(index === 0){
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
        }else {
            fetch(apiUrlGetSpesificCategory+ index, {
                method: 'GET',
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset-UTF-8'
                })
            }).then(response => { return response.json() })
                .then(data => {
                    // setGiftDataByCategory(data);
                    props.func(data)
                });
        }

      }
    return (
      category.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => {setSelectedCategoryIndex(index), GetSpesificCategory(index)}}>
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