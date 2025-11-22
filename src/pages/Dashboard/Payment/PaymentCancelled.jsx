
import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className='m-3.5 p-1.5'>
            <h2>Payment is cancelled. Please try again</h2>
            <Link to="/dashboard/my-parcels">
            <button className='btn btn-primary text-black'>Try Again</button></Link>
        </div>
    );
};

export default PaymentCancelled;
