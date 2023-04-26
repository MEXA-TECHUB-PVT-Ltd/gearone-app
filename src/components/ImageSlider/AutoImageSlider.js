import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions,Text } from 'react-native';
import { appImages } from '../../constant/images';

const { width } = Dimensions.get('window');
const imageWidth = width ;


////////////////////height and width//////////////////
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../utills/Colors';
import { IMAGE_URL } from '../../utills/ApiRootUrl';
const images = [
  appImages.BagsIcon,
appImages.ClothIcon,
];

const AutoImageSlider = (props) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = currentPage === images.length - 1 ? 0 : currentPage + 1;
      setCurrentPage(nextPage);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [currentPage]);

  const handleScroll = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    const page = Math.round(x / imageWidth);
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        contentOffset={{ x: currentPage * imageWidth }}
      >
               
        {props.slider_images_array.map((image, index) => (
            <View style={styles.imageview}>
                   {/* {images.length > -1 ? (
             <SkeletonPlaceholder borderRadius={4}>
         <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 60, height: 60, borderRadius: 50}} />
        <View style={{marginLeft: 20}}>
          <Text style={{marginTop: 6, fontSize: 14, lineHeight: 18,color:'black'}}>Hello world</Text>
        </View>
      </View>
    </SkeletonPlaceholder>
                   ):
                   ( */}
                    <Image
                    key={index}
                    source={ image}
                    style={styles.image}
                    resizeMode={'contain'}
                  />
            </View>

        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {props.slider_images_array.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentPage && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(100),
    alignSelf:'center',
    marginTop:hp(0.1)
  },
  imageview: {
    width: wp(100),
    height: hp(35),
    //borderRadius:wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    borderColor:Colors.appgreycolor,
    borderWidth:wp(0.2),
    backgroundColor:'red'
  },
  image: {
    width: wp(100),
    height: hp(100),
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -20,
  },
  paginationDot: {
    width: wp(2.2),
    height:hp(1.2),
    borderRadius:wp(2),
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.Appthemecolor,
  },
});

export default AutoImageSlider;