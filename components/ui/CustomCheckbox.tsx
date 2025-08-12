
// components/ui/CustomCheckbox.tsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

type Props = {
    label: string;
    checked: boolean;
    onToggle: () => void;
};

const CustomCheckbox: React.FC<Props> = ({ label, checked, onToggle }) => {
    return (
         <TouchableOpacity onPress={onToggle} style={styles.container}>
      <View style={[styles.box, checked && styles.checked]}>
        {checked && <View style={styles.tick} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#6B7280',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  checked: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  tick: {
    width: 10,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 3,
    borderColor: '#10B981',
    transform: [{ rotate: '-45deg' }],
  },
  label: {
    fontSize: 16,
    color: '#374151',
    fontFamily: 'Balasmiq Sans',
  },
});

export default CustomCheckbox;
