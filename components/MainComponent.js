import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRooms, fetchEquipment, fetchApartments, deleteUser, createEquipment, createApartment, createRoom, fetchApartmentType,fetchEquipmentType,fetchUsers,fetchRoomType, loginUser, logoutUser, createUser, putEquipment, ApartmentsFailed } from '../redux/ActionCreators';
import LogIn from './LogIn';
import AdminComponent from './AdminComponent';
import UsersList from './UsersListComponent';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ApartmentList from './ApartmentListComponent';
import Apartments from './ApartmentsComponent';
import RoomList from './RoomListComponent';
import RoomEquipmentList from './EquipmentListComponent';
import EquipmentList from './RoomEquipmentComponent';

const mapStateToProps = state => {
    return {
        rooms: state.rooms,
        equipment: state.equipment,
        apartments: state.apartments,
        users: state.user,
        apartmentType: state.apartmentType,
        roomType: state.roomType,
        equipmentType: state.equipmentType,
        auth: state.auth
    }
}
  
const mapDispatchToProps = dispatch => ({
    fetchRooms: () => { dispatch(fetchRooms())},
    fetchRoomType: () => { dispatch(fetchRoomType())},
    fetchEquipment: () => {dispatch(fetchEquipment())},
    fetchEquipmentType: () => {dispatch(fetchEquipmentType())},
    fetchApartments: () => {dispatch(fetchApartments())},
    fetchUsers: () => {dispatch(fetchUsers())},
    deleteUser: userId => {dispatch(deleteUser(userId))},
    fetchApartmentType: () => {dispatch(fetchApartmentType())},
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    createUser: (user) => dispatch(createUser(user)),
    createApartment: (apartment) => dispatch(createApartment(apartment)),
    createRoom: (room, apartmentId) => dispatch(createRoom(room, apartmentId)),
    createEquipment: (room, apartmentId, equipment) => dispatch(createEquipment(room, apartmentId, equipment)),
    putEquipment:(equipmentId,turnedOn,goal, auto) => dispatch(putEquipment(equipmentId,turnedOn,goal,auto))
});

const navConfig = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#036bfc',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }
}

const MainNavigator = createStackNavigator(
    {
        logIn: LogIn,
        admin: AdminComponent,
        users: UsersList,
        allApartments: Apartments,
        apartments: ApartmentList,
        roomList: RoomList,
        roomEquipmentList: RoomEquipmentList,
        equipment: EquipmentList
    },
    {
        initialRouteName: 'logIn',
        ...navConfig
    }
);


// const AdminNavigator = createStackNavigator({
//     Admin: AdminComponent
//   }, navConfig);

const MainContainer = createAppContainer(MainNavigator);

class Main extends Component {
    componentDidMount() {
            this.props.fetchRooms();
            this.props.fetchEquipment();
            this.props.fetchApartments();
            this.props.fetchUsers();
            this.props.fetchApartmentType();
            this.props.fetchEquipmentType();
            this.props.fetchRoomType();
        }


    render() {

        return (
            <MainContainer />
        );
    }
}

  export default connect(mapStateToProps, mapDispatchToProps)(Main);