
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactElement;
    color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color = 'primary.main' }) => {
    return (
        <Paper 
            elevation={3}
            sx={{ 
                p: 3, 
                display: 'flex', 
                alignItems: 'center', 
                height: '100%',
                borderRadius: 3,
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }
            }}
        >
            <Box sx={{ 
                mr: 3, 
                p: 2,
                bgcolor: color,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="h3" component="p" fontWeight="bold" sx={{ mb: 0.5 }}>
                    {value}
                </Typography>
                <Typography variant="body1" color="text.secondary" fontWeight="medium">
                    {title}
                </Typography>
            </Box>
        </Paper>
    );
};

export default StatCard;
