import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Table, Row, TableWrapper } from 'react-native-table-component';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
        apartments: state.apartments.apartments
    }
}

function Apartments(props) {

    const tableHead = ['id', 'Name'];
    const tableData = props.apartments.map(apartment => [apartment._id, apartment.name]);

    return (
<ScrollView>
            <View style={styles.container}>              
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

export default connect(mapStateToProps)(Apartments);
