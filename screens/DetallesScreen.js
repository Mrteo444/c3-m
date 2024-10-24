import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Button, Alert } from 'react-native';
import { db } from '../database/firebase'; 
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"; 

const DetallesScreen = (props) => {
  const [empleado, setEmpleado] = useState(null);
  const [state, setState] = useState({
    nombre: '',
    area: '',
    puesto: ''
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const getEmpleId = async (id) => {
    try {
      const dbRef = doc(db, 'empleados', id); 
      const docSnap = await getDoc(dbRef);

      if (docSnap.exists()) {
        setEmpleado(docSnap.data()); 
        setState(docSnap.data()); 
        console.log(docSnap.data());
      } else {
        console.log('No existe el empleado con ese ID');
      }
    } catch (error) {
      console.error("Error al obtener el empleado:", error);
    }
  };

  const updateEmpleado = async (id) => {
    try {
      const dbRef = doc(db, 'empleados', id);
      await updateDoc(dbRef, {
        nombre: state.nombre,
        area: state.area,
        puesto: state.puesto,
      });
      Alert.alert('Éxito', 'Empleado actualizado correctamente');
      props.navigation.navigate('empleados')
    } catch (error) {
      console.error("Error al actualizar el empleado:", error);
      Alert.alert('Error', 'No se pudo actualizar el empleado');
    }
  };

  const deleteEmpleado = async (id) => {
    try {
      const dbRef = doc(db, 'empleados', id);
      await deleteDoc(dbRef);
      Alert.alert('Éxito', 'Empleado eliminado correctamente');
      props.navigation.goBack(); 
    } catch (error) {
      console.error("Error al eliminar el empleado:", error);
      Alert.alert('Error', 'No se pudo eliminar el empleado');
    }
  };

  useEffect(() => {
    const empleadoId = props.route.params.id; 
    getEmpleId(empleadoId); 
  }, [props.route.params.id]);

  return (
    <>
      <View>
        <Text>Detalles del Empleado</Text>
        {empleado ? (
          <View>
            <Text>Nombre: {empleado.nombre}</Text>
            <Text>Área: {empleado.area}</Text>
            <Text>Puesto: {empleado.puesto}</Text>
          </View>
        ) : (
          <Text>Cargando datos del empleado...</Text>
        )}
      </View>

      <View>
        <ScrollView>
          <View>
            <TextInput
              placeholder='Nombre'
              value={state.nombre}
              onChangeText={(value) => handleChangeText('nombre', value)}
            />
          </View>
          <View>
            <TextInput
              placeholder='Área'
              value={state.area}
              onChangeText={(value) => handleChangeText('area', value)}
            />
          </View>
          <View>
            <TextInput
              placeholder='Puesto'
              value={state.puesto}
              onChangeText={(value) => handleChangeText('puesto', value)}
            />
          </View>
          <View>
            <Button title='Editar' onPress={() => updateEmpleado(props.route.params.id)} />
            <Button title='Eliminar' onPress={() => deleteEmpleado(props.route.params.id)} />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default DetallesScreen;
