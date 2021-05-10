import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Modal, Text, Button } from 'react-native';
import { Table, Row, TableWrapper } from 'react-native-table-component';
import { Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { createUser, deleteUser, fetchUsers } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        users: state.user.users
    }
}

const mapDispatchToProps = dispatch => ({
    createUser: (user) => dispatch(createUser(user)),
    fetchUsers: () => {dispatch(fetchUsers())},
    deleteUser: userId => {dispatch(deleteUser(userId))}
});

function UsersList(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const tableHead = ['Firstname', 'Lastname', 'Delete'];

    const deleteUser = userId => {
      props.deleteUser(userId);
      props.fetchUsers();
    };

    const tableData = props.users.map(user => [user.firstname, user.lastname, <Icon name="trash" onPress={() => deleteUser(user._id)} type="font-awesome" size={15} color="#f00"/>]);
   
    const addUser = () => {
        const user = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: password,
        };

        props.createUser(user);
        setModalVisible(false);
      }
   
    return (
        <ScrollView>
            <View style={styles.container}>
                <Icon name="plus-circle" type="font-awesome" onPress={() =>
                setModalVisible(true)} size={35} color="#036bfc" style={{marginBottom: 10}}/>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() =>
                        {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                        }}
                        >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Create User</Text>
                                <Input placeholder='First name' onChangeText={value => setFirstName(value)}/>
                                <Input placeholder='Last name' onChangeText={value => setLastName(value)}/>
                                <Input placeholder='Username' onChangeText={value => setUsername(value)}/>
                                <Input placeholder='Password' onChangeText={value => setPassword(value)}/>
                                <Button title="Add User" onPress={() => addUser()}></Button>
                            </View>
                        </View>
                    </Modal>
                </View>
                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                    <Row data={tableHead} style={styles.header}></Row>
                    {tableData.map(rowData => {
                        return (
                        <TableWrapper >
                            <Row data={rowData} style={styles.row}></Row>
                        </TableWrapper>
                        )
                    })}
                </Table>
            </View>
        </ScrollView>


    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    text: { fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        width: "100%",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
      },
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(UsersList);