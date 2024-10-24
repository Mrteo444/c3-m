import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Button, Alert } from 'react-native';
import { db } from '../database/firebase'; // Importa la base de datos configurada
import { collection, addDoc } from 'firebase/firestore';

const CreateScreen = (props) => {
  const [state, setState] = useState({
    nombre: '',
    area: '',
    puesto: ''
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const addNewEmpleado = async () => {
    if (state.nombre === '') {
      Alert.alert('Error', 'Ingrese datos del empleado');
    } else {
      try {
     
        await addDoc(collection(db, 'empleados'), {
          nombre: state.nombre,
          area: state.area,
          puesto: state.puesto
        });
        Alert.alert('Éxito', 'Datos guardados');
        props.navigation.navigate('empleados')
      } catch (error) {
        console.error("Error al guardar el empleado: ", error);
        Alert.alert('Error', 'Hubo un problema al guardar los datos');
      }
    }
  };

  return (
    <ScrollView>
      <View>
        <TextInput
          placeholder='Nombre'
          onChangeText={(value) => handleChangeText('nombre', value)}
        />
      </View>
      <View>
        <TextInput
          placeholder='Área'
          onChangeText={(value) => handleChangeText('area', value)}
        />
      </View>
      <View>
        <TextInput
          placeholder='Puesto'
          onChangeText={(value) => handleChangeText('puesto', value)}
        />
      </View>
      <View>
        <Button title='Guardar' onPress={() => addNewEmpleado()} />
      </View>
    </ScrollView>
  );
};

export default CreateScreen;
