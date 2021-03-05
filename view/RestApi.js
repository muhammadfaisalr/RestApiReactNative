import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Button, FlatList, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'

export default function RestApi() {
    const [title, setTitle] = useState('')
    const [value, setValue] = useState('')
    const [items, setItems] = useState('')
    const [button, setButton] = useState('Simpan')
    const [selectedUser, setSelectedUser] = useState({})

    const submit = () => {
        const data = {
            value, title
        }

        if (button == 'Simpan'){
            
            axios.post('https://achmadhilmy-sanbercode.my.id/api/v1/news', data)
                .then(response =>{
                    console.log('Response : ', response);
                    setTitle('')
                    setValue('')
                    getData()
                }).catch(error =>{
                    console.log('Error : ', error);
                })

        }else {

            axios.put(`https://achmadhilmy-sanbercode.my.id/api/v1/news/${selectedUser.id}`, data)
                .then(response => {
                    console.log('Response : ', response);
                    setTitle('')
                    setValue('')
                    getData()
                    setButton('Simpan')
                }).catch(err =>{
                    console.log('Error : ', err);
                })
        }
    }

    const onSelectItem = (item) => {
        console.log(item);
        setSelectedUser(item)
        setTitle(item.title)
        setValue(item.value)
        setButton('Update')
    }

    const getData = () => {
        axios.get('https://achmadhilmy-sanbercode.my.id/api/v1/news')
            .then(response => {
                const data1 = (response.data.data)
                console.log('Response : ', data1);
                setItems(data1)
            }).catch(err => {
                console.log('Error: ' + err.message);
            })
    }

    const onDelete = (item) => {
        axios.delete(`https://achmadhilmy-sanbercode.my.id/api/v1/news/${item.id}`)
            .then(response => {
                console.log('Response : ', response);
                getData()
            }).catch(err => {
                console.log('Error : ', err);
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>API (CRUD)</Text>
            </View>
            <View style={styles.content1}>
                <Text>Post Data</Text>
                <TextInput
                    placeholder='Judul Berita'
                    style={styles.input}
                    value={title}
                    onChangeText={(value) => setTitle(value)}/>

                <TextInput
                    placeholder='Isi Berita'
                    style={styles.input}
                    value={value}
                    onChangeText={(value) => setValue(value)}/>

                <Button
                    title={button}
                    onPress={submit} />
            </View>
            <View style={styles.content1}>
                <Text>List Berita</Text>
                <FlatList
                    data = {items}
                    keyExtractor= {(item, index) => `${item.id}-${item.index}`}
                    renderItem={({item}) => {
                        return (
                            <View> 
                                <TouchableOpacity onPress={() => onDelete(item)}>
                                    <Text style={{color: 'red', alignSelf: 'flex-end'}}>X</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onSelectItem(item)} style={{borderRadius: 6,backgroundColor:'grey', padding: 5, marginBottom:10}}>
                                    <Text style={{color : 'white'}}>{item.title}</Text>
                                    <Text style={{color : 'white'}}>{item.value}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }} />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        paddingTop: 50,
        paddingHorizontal: 16,
        backgroundColor: 'grey',
        alignItems: 'center'
    },
    title : {
        color: 'white',
        fontSize: 20
    },
    content1 : {
        paddingHorizontal: 16
    },

    input : {
        borderWidth : 1,
        paddingVertical : 10,
        paddingHorizontal : 5, 
        borderRadius : 6, 
        marginBottom : 10
    },

    contentNews : {
        backgroundColor : 'grey',
        paddingVertical : 10
    }
})
