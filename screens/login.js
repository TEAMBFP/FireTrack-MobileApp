import * as React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/SimpleLineIcons';


export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props)
        this.validateInput = React.createRef()
    }
    state = {
        username: "",
        password: "",
        errMsg: ""
    }

    onLogin = () => {
        if (this.state.username == 'abe' && this.state.password == 'pretty') {
            this.props.navigation.navigate('Main')
        } else {
            this.validateInput.current.shake(800)
            this.setState({ errMsg: 'Invalid login details. Try again!' })
        }
    }



    render() {
        return (

            <View style={styles.container}>
                <Image style={styles.image}
                 source={require('./drawnav/1.png')} />

                <Animatable.View
                    ref={this.validateInput}
                >
                    <Icon name="envelope" size={20} style={{ position: 'absolute', top:61, left: 20, color: '#FB9246' }} />
                    <TextInput
                        placeholder="Email"
                        style={styles.fields}
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' })
                            this.setState({ username: text })
                        }
                        }
                    />
                    <Icon name="lock" size={20} style={{ position: 'absolute', top: 139, left: 20, color: '#FB9246' }} />
                    <TextInput
                        placeholder="Password"
                        style={styles.fields}
                        secureTextEntry
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ password: text })
                        }
                        }

                    />
                    <Text style={{ color: 'red', textAlign: 'center', top: 130 }}>{this.state.errMsg}</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('ForgotPass')}
                    >
                        <Text style={{ textAlign: 'center', color: '#FB9246', fontSize: 16, left: 80, bottom: 1 }}>Forgot Password?</Text>
                    </TouchableOpacity>
                </Animatable.View>

                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 5, top: 30 }}>
                    <TouchableOpacity
                        onPress={() => this.onLogin()}
                        style={{ width: 200, height: 50, backgroundColor: '#FB9246', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#000000' }}
                    >
                        <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Signup')}
                    >
                        <Text style={{ textAlign: 'center', color: '#FB9246', fontSize: 16 }}>Don't have an account? Sign up.</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    fields: {
        height: 50,
        width: 300,
        top: 31,
        margin: 15,
        paddingHorizontal: 40,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: '#d3d3d3d3',

    },
    image: {
    right: 10,
    left: 3,
    height: 270,
    width: 370,
    top: 120,
},

}    
);