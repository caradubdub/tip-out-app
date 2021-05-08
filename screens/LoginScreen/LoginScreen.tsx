import React, {useState, useEffect} from "react";
import { useQuery } from "@apollo/client"
import SIGNIN_USER from "../../graphql/mutations/signIn"

import styles from "./styles";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { LoginProps } from "../../types";
import { RootState } from "../../state/store"

import {useSelector, useDispatch} from 'react-redux'
import {setEmail, setPassword} from '../../state/actions/actions'

import StyledPrimaryButton from "../../components/PrimaryButton";

export default function LoginScreen({ navigation }: LoginProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  

  const onSubmitSignin = (email: string, password: string) => {
    const { data, error, loading } = useQuery(SIGNIN_USER, {variables: { email: email, password: password },
    });
    console.log('data', data)
  };

  
  const {email, password} = useSelector((state: RootState) => state.loginReducer);//loginData contains .email and .password
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>Please enter your Info</Text>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={email => dispatch(setEmail(email))} //how to update state text on input with redux in rreact native
              value={value}
              placeholder="email"
              placeholderTextColor="#f0b3ff"
            />
          );
        }}
        name="email"
        rules={{ required: true }}
      />
      {errors.firstName && <Text>Email is required!</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(password) => dispatch(setPassword(password))}
              value={value}
              placeholder="password"
              placeholderTextColor="#f0b3ff"
            />
          );
        }}
        name="password"
        rules={{ required: true }}
      />
      {errors.lastName && <Text>Password is required!</Text>}

      <StyledPrimaryButton
        text={"Login"}
        onPress={handleSubmit(onSubmitSignin(email: string, password: string) => {
          const { data, error, loading } = useQuery(SIGNIN_USER, {variables: { email: email, password: password },
          });
          console.log('data', data))
          
          //onSubmitSignin(email, password)
       //graphql query for database
          //navigation.navigate("BottomTab");
        }
        //)}
      />
    </View>
  );
}
