import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Payment = () => {
    const { parcelId } = useParams();

    const axiosSecure = useAxiosSecure();

    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

    if (isLoading) {
        return <div className='min-h-3/5 flex gap-4 justify-center items-center'>
            <span className="loading loading-spinner text-info"></span>
            <span className="loading loading-spinner text-success"></span>
            <span className="loading loading-spinner text-warning"></span>
            <span className="loading loading-spinner text-error"></span>
        </div>
    }

    return (
        <div className='m-4 p-3'>
            <h3>Please pay : {parcel.parcelName} </h3>
            <button className='btn btn-primary text-black'>Pay</button>
        </div>
    );
};

export default Payment;