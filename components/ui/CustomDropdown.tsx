// components/ui/CustomDropdown.tsx
import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

type Props = {
    label: string;
    options: string[];
    selected: string | null;
    onSelect: (value: string) => void;
};

const CustomDropdown: React.FC<Props> = ({ label, options, selected, onSelect }) => {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setOpen(!open)} style={styles.dropdownHeader}>
                <Text style={styles.dropdownLabel}>{selected || label}</Text>
            </TouchableOpacity>
            {open && (
                <View style={styles.optionsContainer}>
                    {options.map((option) => (
                        <TouchableOpacity key={option} onPress={() => {
                            onSelect(option);
                            setOpen(false);
                        }} style={styles.optionItem}>
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: 16 },
    dropdownHeader: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#F9FAFB',
    },
    dropdownLabel: {
        fontFamily: 'Balasmiq Sans',
        color: '#374151',
    },
    optionsContainer: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        backgroundColor: '#EDE9FE',
    },
    optionItem: {
        padding: 12,
    },
    optionText: {
        fontFamily: 'Balasmiq Sans',
        color: '#4B5563',
    },
});

export default CustomDropdown;
