import React , { useState } from 'react'
import { View, } from 'react-native'
import { Button,Text,Input } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'

const UpdateScreen = ({navigation,route}) => {
  const { ekipToUpdate } = route.params
    const ekiptId = ekipToUpdate.id
const [ekip, setEkip] = useState({
  name: ekipToUpdate.name,
  age:  ekipToUpdate.age,
  iletişim:  ekipToUpdate.iletişim,
  görev:  ekipToUpdate.görev,

        
       
       
    })

    const updateEkip = async (ekip) => {
        try {
            await firestore().collection('ekip').doc(ekiptId).update(ekip)
            navigation.navigate('Feed')

           } 
           catch (error) 
           {
            console.log(error)
           }
    }
  return (
    <View style={{flex: 1, justifyContent:'center', paddingHorizontal: 15}}>
    <Text style={{textAlign:'center', marginBottom: 15}}>Ekip elemanı güncelle </Text>
    <Input 
            value={ekip.name}
            onChangeText={(name) => {setEkip({...ekip, name: name})}}
            placeholder='Enter name'
            leftIcon={{ type: 'font-awesome', name: 'header'}}
            />
            <Input 
            value={ekip.age}
            onChangeText={(age) => {setEkip({...ekip, age: age})}}
            placeholder='Enter age'
            leftIcon={{ type: 'font-awesome', name: 'vcard'}}
            />
            <Input 
            value={ekip.iletişim}
            onChangeText={(iletişim) => {setEkip({...ekip, iletişim: iletişim})}}
            placeholder='Enter iletişim'
            leftIcon={{ type: 'font-awesome', name: 'address-book'}}
            />
            <Input 
            value={ekip.görev}
            onChangeText={(görev) => {setEkip({...ekip, görev: görev})}}
            placeholder='Enter department'
            leftIcon={{ type: 'font-awesome', name: 'desktop'}}
            />
            <Button title='SEND' onPress={() => {updateEkip(ekip)}}/>
    </View>
  )
}
export default UpdateScreen