import React, {useState} from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import { putEquipment } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { Slider, Icon } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

const mapStateToProps = state => {
    return {
        equipment: state.equipment.equipment,
        equipmentTypes: state.equipmentType.equipmentType
    }
}

const mapDispatchToProps = dispatch => ({
    putEquipment: (equipmentId,turnedOn,goal, auto) => dispatch(putEquipment(equipmentId,turnedOn,goal,auto)),
});



const EquipmentForm = (props) => {

    var [turnedOn, setTurnedOn] = useState(props.equipmentState);
    var [currentGoal, setCurrentGoal] = useState(props.equipmentGoal);
    var [auto, setAuto] = useState(props.equipmentAuto);

    const obtainNotificationPermission=async ()=> {
        let permission =  await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
        permission = Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to show notifications');
        }
        }
        return permission;
        }
        
    const presentLocalNotification=()=> {
        obtainNotificationPermission();
        Notifications.scheduleNotificationAsync({
        content: {
        title: "Goal modified",
        body: 'Your goal is set!',
        data: { data: 'goes here' },
        },
        trigger: { seconds: 2 },
        });
        }

    const handleState = () => {
        turnedOn = !turnedOn;
        setTurnedOn(turnedOn);
        props.putEquipment(props.equipmentId, turnedOn, props.equipmemtGoal, props.equipmentAuto);
    }


      const handleGoal = () => {
          props.putEquipment(props.equipmentId, turnedOn, currentGoal, props.equipmentAuto);
          Alert.alert(
            'Your update OK?',
            'Current goal: ' + this.state.currentGoal,
            [
            {text: 'Set Goal', onPress: () => { presentLocalNotification()}},
            ],
            { cancelable: false }
            );
      }

      const handleAuto = () => {
        auto = !auto;
        setAuto(auto);
        props.putEquipment(props.equipmentId, turnedOn, currentGoal, auto);
      }
      
        return (
            <View > 
                <Button title={turnedOn ? 'Turn Off' : 'Turn On'} onPress={handleState}></Button>
                <Text className="Labelclass">The equipment is {turnedOn ? 'on' : 'off'}!</Text>
                  <Slider
                    value={currentGoal}
                    onValueChange={setCurrentGoal}
                    maximumValue={9}
                    minimumValue={0}
                    step={1}
                    trackStyle={{ height: 10, backgroundColor: 'transparent' }}
                    thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                    thumbProps={{
                        children: (
                          <Icon
                            name="exchange"
                            type="font-awesome"
                            size={20}
                            reverse
                            containerStyle={{ bottom: 20, right: 20 }}
                            color="#036bfc"
                          />
                        ),
                      }}/>
                <Text className="Labelclass">Current Goal: {currentGoal}</Text>
                <Button title="Set Goal" onPress={handleGoal}>Set Goal</Button>

                {props.equipmentType==='Lamp' ? <View><Button onPress={handleAuto} title="Change Auto"></Button></View> : <View></View> }
            </View>
        );
}


function RenderRoomEquipment ({equipment,equipmentId,putEquipment}) {

    if (equipment != null)
    return (
        <View className="slider">
            
            <View>
                {equipment.map((equipment)=>{
                        var auto = false;
                        if(equipment.auto != null)
                        {
                            auto = equipment.auto;
                        }
                        else{
                            auto = null;
                        }
                    return (
                        <View key={equipment._id}>
                            <Text className="Labelclass">{equipment.equipmentTypeId.name}</Text>
                            {/* <Image className="imageclass" src={require(equipment.equipmentTypeId.imagePath)} alt={equipment.equipmentTypeId.name} /> */}
                            <EquipmentForm equipmentState={equipment.turnedOn} equipmentAuto={auto} equipmentType={equipment.equipmentTypeId.name} equipmentGoal={equipment.goal} equipmentId={equipmentId} putEquipment={putEquipment}></EquipmentForm >                      
                        </View>
                    );
                })}
            </View>
    </View>
    ); 
}

const EquipmentList = (props) => {
    const equipId = props.navigation.getParam('equipId', '');

    
    return (
        <ScrollView className="container">
            <View className="row">
                <View className="col-12">
                    <Text className="slider" style={{ textAlign: 'center', fontSize: 25}}>Equipment</Text>
                </View>                
            </View>
            <View className="col-12 col-md-5 m-1"  key={props.equipment._id}>
                <RenderRoomEquipment equipmentTypes={props.equipmentTypes} equipment={props.equipment.filter((equipment) => equipment._id === equipId)} equipmentId={equipId} putEquipment={props.putEquipment}/>
            </View>
        </ScrollView>
    );
}

connect(mapStateToProps, mapDispatchToProps)(RenderRoomEquipment);
export default connect(mapStateToProps, mapDispatchToProps)(EquipmentList);