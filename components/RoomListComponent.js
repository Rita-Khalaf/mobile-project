import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { imageMap } from '../shared/imageMap';

const mapStateToProps = state => {
    return {
        apartments: state.apartments.apartments,
        rooms: state.rooms.rooms
    }
}

const RenderRooms = ({rooms, navigation}) => {
    const { navigate } = navigation;

    const rms = rooms.map(room => {
        return (
            <Card>
                <Card.Title>{room.name}</Card.Title>
                <Card.Divider/>
                <Card.Image source={{uri: baseUrl + room.image}}/>
                <Button title="View" onPress={() => navigate('equipmentList', {roomId: room._id})}></Button>
            </Card>
        );
    });

    if (rooms == null) {
        return <ScrollView></ScrollView>
    }
    else{
        return (
            <ScrollView>
                <Text className="slider" style={{ textAlign: 'center', fontSize: 25}}> Rooms</Text>
                    {rms}    
            </ScrollView>
        );
    }

}

const RoomList = (props) => {
    const { navigate } = props.navigation;
    const apartmentId = props.navigation.getParam('apartmentId','');
    const apartment = props.apartments.filter((apartment) => apartment._id === apartmentId)[0];
    const allRooms = props.rooms.filter((room) => room.apartment ===  apartmentId);

    // alert(JSON.stringify(allRooms));
    return (
        <ScrollView className="container">
            <View className="row">
                <View className="col-12 col-md-5 m-1">
                    {/* <RenderRooms rooms={allRooms}/>
                     */}
                    <Text className="slider" style={{ textAlign: 'center', fontSize: 25}}> Rooms</Text>
                    {allRooms.map(room => {
                        // alert(JSON.stringify(room));
                        const imgPath = room.roomTypeId.imagePath.toString();
                        var img = imageMap[imgPath];
                        return (
                            <Card>
                                <Card.Title>{room.name}</Card.Title>
                                <Card.Divider/>
                                <Card.Image source={img}/>
                                <Button title="View"  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}} onPress={() => navigate('roomEquipmentList', {roomId: room._id})}></Button>
                            </Card>
                        )
                    })}
                   
                </View>
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps)(RoomList);