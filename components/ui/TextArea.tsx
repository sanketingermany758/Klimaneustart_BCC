import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface TextAreaProps extends TextInputProps {
    label: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                multiline
                textAlignVertical="top"
                placeholderTextColor="#9CA3AF"
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151', // gray-700
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB', // gray-300
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 12,
        fontSize: 16,
        color: '#111827', // gray-900
        backgroundColor: '#FFFFFF',
        minHeight: 100,
    },
});

export default TextArea;
