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

    const handlePayment = async () => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

        console.log(res.data); // url pabo , ekane use navigate use hobe na karon usenavigate e suburl bosai , eikhane .com , ract er bairer ekta url pabo , 

        window.location.href = res.data.url;
    }

    if (isLoading) {
        return <div className='min-h-3/5 flex gap-4 justify-center items-center'>
            <span className="loading loading-spinner text-info"></span>
            <span className="loading loading-spinner text-success"></span>
            <span className="loading loading-spinner text-warning"></span>
            <span className="loading loading-spinner text-error"></span>
        </div>
    }

    return (
        <div className='m-4 p-3 flex justify-start items-center gap-2.5'>
            <h3 className='font-semibold text-xl'>Please pay {parcel.cost}tk for : {parcel.parcelName} </h3>
            <button
                onClick={handlePayment}
                className='btn btn-primary text-black'>Pay</button>
        </div>
    );
};

export default Payment;