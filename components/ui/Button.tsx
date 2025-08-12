import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';

interface ButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    icon?: React.ReactNode;
    style?: object;
    textStyle?: object;
    disabled?: boolean;
    loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onPress, variant = 'primary', icon, style, textStyle, disabled, loading }) => {
    const isDisabled = disabled || loading;

    const containerStyle = {
        primary: styles.primaryContainer,
        secondary: styles.secondaryContainer,
        danger: styles.dangerContainer,
    }[variant];

    const textStyleVariant = {
        primary: styles.primaryText,
        secondary: styles.secondaryText,
        danger: styles.dangerText,
    }[variant];
    
    // Extract color for the activity indicator from the variant's text style
    const indicatorColor = StyleSheet.flatten(textStyleVariant).color;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.base, containerStyle, isDisabled && styles.disabled, style]}
            disabled={isDisabled}
        >
            {loading ? (
                <ActivityIndicator color={indicatorColor} />
            ) : (
                <>
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <Text style={[styles.text, textStyleVariant, textStyle]}>{children}</Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconContainer: {
        marginRight: 8,
    },
    primaryContainer: {
        backgroundColor: '#FBBF24', // yellow-400
    },
    primaryText: {
        color: '#000000',
    },
    secondaryContainer: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#D1D5DB', // gray-300
    },
    secondaryText: {
        color: '#374151', // gray-700
    },
    dangerContainer: {
        backgroundColor: '#DC2626', // red-600
    },
    dangerText: {
        color: '#FFFFFF',
    },
    disabled: {
        opacity: 0.6,
    },
});

export default Button;
