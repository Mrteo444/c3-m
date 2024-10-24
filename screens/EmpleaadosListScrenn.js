import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { db } from '../database/firebase'; 
import { collection, onSnapshot } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';

const EmpleadosListScreen = (props) => {

  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'empleados'), (querySnapshot) => {
      const empleadosArray = [];
      querySnapshot.forEach((doc) => {
        empleadosArray.push({ ...doc.data(), id: doc.id });
      });
      setEmpleados(empleadosArray);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Sesión cerrada');
        props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>Nombre: {item.nombre}</Text>
      <Text>Puesto: {item.puesto}</Text>
      <Text>Área: {item.area}</Text>

      <Button 
        title="Editar" 
        onPress={() => props.navigation.navigate('detalle', { id: item.id })} 
      />

      <Button 
        title="Borrar" 
        onPress={() => console.log('Borrar empleado')} 
      />
    </View>
  );

  return (
    <>
      <View>
        <Button 
          title="Agregar" 
          onPress={() => props.navigation.navigate('crear')} 
        />

        <Button 
          title="Salir de sesión" 
          onPress={handleLogout} 
        />
      </View>

      <FlatList
        data={empleados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default EmpleadosListScreen;
