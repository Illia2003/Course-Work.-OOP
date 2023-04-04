import React from 'react';
import { Card } from '@mui/material';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Guest({ children }) {
    return (
        <div className="body page-content min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className='mb-6 page-content'>
                <ApplicationLogo className="h-9 w-auto" fill="#fff"/>
            </div>
            <Card className="page-content w-full sm:max-w-md px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </Card>
        </div>
    );
}
