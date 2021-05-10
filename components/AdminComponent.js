import React from 'react'
import { View, Text, ScrollView, Button } from 'react-native';

function AdminComponent(props) {
    const { navigate } = props.navigation;
    return (
        <ScrollView component="main" style={{ backgroundColor: '#141313',}}>
            <View style={{  display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Text component="h1" variant="h5" style={{ fontSize: 25, color: 'white', marginTop: 250, marginBottom: 10}}>
                    Admin
                </Text>
        
                <Button title="View Apartments" onPress={() => navigate('allApartments')}></Button>

                <Button title="View Users" onPress={() => navigate('users')}></Button>
            </View>
        </ScrollView>
        );
}



  

export default AdminComponent;
