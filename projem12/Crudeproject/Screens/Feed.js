import React, { useState, useEffect} from 'react'
import firestore from '@react-native-firebase/firestore'
import { Card, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, ScrollView } from 'react-native'

const Feed = ({navigation}) => {
    const [ekip, setEkip] = useState([])

    const fetchEkip = async () => {
        const ekipCollection = await firestore().collection('ekip').get()
        console.log(ekipCollection.docs)
        setEkip(
            ekipCollection.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            })
        )
    }

    const deleteEkip = async (id) => {
        const res = await firestore().collection('ekip').doc(id).delete()
        console.log(res)
        fetchEkip()
    }


    useEffect(()=> {
            fetchEkip()
        },[])
  return (
    <View>
     <Header 
     
            placement='left'
            centerComponent={{text: 'EKİP', style:{color: '#fff', marginTop: 2}}}
            leftComponent={{icon: 'people', color: '#fff'}}
           
            />

            <ScrollView>
         {
            ekip.map(ekip => {
                return(
                    <Card key={ekip.id}>
                        <Card.Title style={{fontSize: 21, color: 'green'}}>{ekip.name}</Card.Title>
                        <Card.Divider />
                                <Card.Title>{ekip.age} years old {ekip.görev} mesleği,irtibat
                                at {ekip.iletişim}
                                </Card.Title>
                                <Card.Divider />
                                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <Icon 
                                    name='pencil'
                                    color={'steelblue'}
                                    size={20}
                                    onPress={() => {navigation.navigate('Update', {
                                        ekipToUpdate: ekip
                                    })}}
                                    
                                    />
                                    <Icon 
                                    name='trash'
                                    color={'olive'}
                                    size={20}
                                    onPress={() => {deleteEkip(ekip.id)}}
                                    />
                                </View>
                    </Card>
                )
            })
         }
            </ScrollView>
    </View>
  )
}

export default Feed
