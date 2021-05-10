import React, {useState} from 'react';
import { View, Text, ScrollView, TextInput, Button } from 'react-native';
import { loginUser } from '../redux/ActionCreators';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => ({
    loginUser: (creds) => dispatch(loginUser(creds))
});

const LogIn = (props) => {
    const { navigate } = props.navigation;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  }

  const handleLogIn = async () => {
    let credentials = {
      'username': username,
      'password': password
    };

    props.loginUser(credentials).then(res => {
        if(props.auth.isAuthenticated){
          if(props.auth.admin){
            navigate('admin');
          }
          else{
            navigate('apartments')
          }
        }
  
        else{
alert("wrong username/password");
        }
      });

  }

  return (
  <ScrollView component="main" maxWidth="xs" style={{backgroundColor: '#141313'}}>
      <View style={{marginTop: 250, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
        <Text style={{ color: 'white', fontSize: 40}}>
          Sign in
        </Text>
          <TextInput
          style={{    backgroundColor: '#3d3a3a', borderRadius: 15, border: '0.7px solid #3d3a3a',
    color: '#ffffff', width: 250, height: 35, marginBottom: 5, marginTop: 5}}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          />
          <TextInput
            style={{    backgroundColor: '#3d3a3a', borderRadius: 15, border: '0.7px solid #3d3a3a',
    color: '#ffffff', width: 250, height: 35, marginBottom: 10, marginTop: 5}}
    value={password} onChangeText={setPassword}/>
          <Button title="Log In" onPress={handleLogIn}> </Button>
      </View>
    </ScrollView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);