import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { imageMap } from '../shared/imageMap'

const mapStateToProps = state => {
    return {
        apartments: state.apartments.apartments,
    }
}

// function RenderApartmentsItem ({apartment, navigate}) {
//     const url = 'http://localhost:3444/'
//     return (
                

//     );
// }

const ApartmentList = (props) => {
    const { navigate } = props.navigation;
    const apartmentList = props.apartments.map((apartment) => {
        const img = apartment.apartmentTypeId.imagePath.toString();
        var imgPath = imageMap[img];
        return (
            <View className="col-12 col-md-5 m-1"  key={apartment._id}>
                <Card>
                    <Card.Title>{apartment.name}</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={imgPath}/>
                    <Button title="View"  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}  onPress={() => navigate('roomList', {apartmentId: apartment._id})}></Button>
                </Card>
            </View>
        );
        
    });

    return (
        <ScrollView className="container">
            <View className="row">

                <View className="col-12">
                    <Text  style={{ textAlign: 'center', fontSize: 25}} >ApartmentList</Text>
                    {/* <hr/> */}
                </View>                
            </View>
            <View className="row">
                {apartmentList}
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps)(ApartmentList);