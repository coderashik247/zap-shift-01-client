import React from 'react';
import Logo from '../components/Logo/Logo';
import { Outlet } from 'react-router';
import AuthImage from '../assets/images/authImage.png';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto '>
            <Logo/>
            <div className='mt-10 flex justify-center items-center'>
                <div className='flex-1 '>
                    <Outlet />
                </div>
                <div className='flex-1 '>
                    <img src={AuthImage} alt="Auth" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;