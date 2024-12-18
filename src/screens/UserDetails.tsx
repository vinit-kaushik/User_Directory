import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ContentContainer = ({heading, value}) => {
  return (
    <View style={{marginBottom: 10}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', paddingBottom: 2}}>{heading}</Text>
      <Text style={{fontSize: 18}}>{value}</Text>
    </View>
  )
}

const UserDetails = ({ route }) => {
    const params = route.params
    const {name, username, email, address, phone, website, company} = route.params.item;
    const navigation = useNavigation();
    // console.log(`userDetailsParams===>`, userDetailsParams)
  return (
      <SafeAreaView style={styles.detailParentContainer}>
        {/* <Text>{JSON.stringify(params, null, 2)}</Text> */}
        <Pressable onPress={()=>navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      <Text style={styles.detailHeadingText}>{name} Details</Text>
      <View style={styles.detailBoxContainer}>
        <ContentContainer heading={'Name'} value={`${name} (${username})`} />
        <ContentContainer heading={'Email'} value={email} />
        <ContentContainer heading={'Address'} value={`${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`} />
        <ContentContainer heading={'Phone Number'} value={phone} />
        <ContentContainer heading={'Website'} value={website} />
        <ContentContainer heading={'Company Name'} value={company.name} />
      </View>
    </SafeAreaView>
  )
}

export default UserDetails

const styles = StyleSheet.create({
  detailParentContainer: {
    flex: 1, 
    paddingLeft: 20
  },
  backButtonText: {
    fontSize: 20, 
    textAlign: 'center'
  },
  detailHeadingText: {
    textAlign: 'center', 
    fontSize: 30,
    marginTop: 15
  },
  detailBoxContainer: {
    backgroundColor: 'white', 
    borderWidth: 1, 
    borderColor: 'black', 
    borderRadius: 20, 
    paddingVertical: 20, 
    paddingLeft: 15,
    width: '85%', 
    alignSelf: 'center', 
    marginTop: 20
  }
})