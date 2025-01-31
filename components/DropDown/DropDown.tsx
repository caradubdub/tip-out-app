import React from "react";
import styles from "./styles";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import employees from "../../Data/Employees";

export default function DropDown({value, onChange}) {
  return (
    <View>
      <Picker
        selectedValue={value}
        style={styles.dropDown}
        itemStyle={styles.text}
        onValueChange={(itemValue) => onChange(itemValue)}
      >
        {employees.map((employee) => {
          return (
            <Picker.Item
              key={employee.id}
              label={`${employee.firstName} ${employee.lastName}`}
              value={`${employee.firstName}`}
            />
          );
        })}
      </Picker>
    </View>
  );
}