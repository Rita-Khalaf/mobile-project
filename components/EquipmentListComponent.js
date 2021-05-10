import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { baseUrl } from '../shared/baseUrl';
import { imageMap } from '../shared/imageMap';
import { connect } from 'react-redux';
import { Card, Icon, Button } from 'react-native-elements';

const mapStateToProps = state => {
    return {
        rooms: state.rooms.rooms,
        equipment: state.equipment.equipment
    }
}

// function RenderEquipmentItem ({equipment}) {
//     return (
//         <View>
//             <Image className="imageClass" src={{ uri: baseUrl+equipment.image }} alt={equipment.name} />
//             <Text className="LabelClass">{equipment.name}</Text>
//         </View>            
//     );
// }

const RoomEquipmentList = (props) => {
    const { navigate } = props.navigation;
    const roomId = props.navigation.getParam('roomId','');
    const allEquips = props.equipment.filter((equip) => equip.room === roomId);
    // alert(JSON.stringify(allEquips));
    const equipList = allEquips.map((equip) => {    
        
        
        const img = equip.equipmentTypeId.imagePath.toString();
        var imgPath = imageMap[img];

        return (           
            <View className="col-12 col-md-5 m-1"  key={equip._id}>
                <Card>
                    <Card.Title className="LabelClass">{equip.equipmentTypeId.name}</Card.Title>
                    <Card.Divider/>
                    <Card.Image className="imageClass" source={imgPath} />         
                    <Button title="View" buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                     onPress={() => navigate("equipment", {equipId: equip._id})}></Button>
                </Card>    
            </View>
        );
    });



    return (
        <ScrollView className="container">
            <View className="row">
                
                <View className="col-12">
                    <Text style={{ textAlign: 'center', fontSize: 25}}>EquipmentList</Text>
                </View>                
            </View>
            <View className="row">
                {equipList}
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps)(RoomEquipmentList);