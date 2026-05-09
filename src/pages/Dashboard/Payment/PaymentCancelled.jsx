import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2>Payment is Cancelled. Please try again</h2>
            <Link to="/dashboard/my-parcels" className='btn btn-primary text-secondary'>Try agin</Link>
        </div>
    );
};

export default PaymentCancelled;