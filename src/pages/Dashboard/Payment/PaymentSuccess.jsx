import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();

    console.log(sessionId);

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    })
                })
        }

    }, [sessionId, axiosSecure])

    return (
        <div className="m-6 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-green-600 flex items-center gap-2">
                Payment Successful
                <span className="text-green-500 text-4xl">✔</span>
            </h2>

            <p className="mt-4 text-gray-700 text-lg">
                <span className="font-semibold">Transaction ID:</span> {paymentInfo.transactionId}
            </p>

            <p className="mt-2 text-gray-700 text-lg">
                <span className="font-semibold">Tracking ID:</span> {paymentInfo.trackingId}
            </p>

            
        </div>

    );
};

export default PaymentSuccess;