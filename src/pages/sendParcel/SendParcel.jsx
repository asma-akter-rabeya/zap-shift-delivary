import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {
    const { register, handleSubmit, control } = useForm();
    const serviceCenter = useLoaderData();
    const regionsDuplicate = serviceCenter.map(center => center.region);
    const regions = [...new Set(regionsDuplicate)];

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    // const senderRegion = watch('senderRegion'); // explore useMemo , useCallBack
    const senderRegion = useWatch({ control, name: 'senderRegion' });
    const receiverRegion = useWatch({ control, name: 'receiverRegion' })

    const districtByRegion = (region) => {
        const regionDistrict = serviceCenter.filter(c => c.region === region)
        const districts = regionDistrict.map(d => d.district)
        return districts
    }

    const handleSendParcel = (data) => {
        console.log(data)
        const isDocument = data.parcelType === 'document';
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);

        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;

                cost = minCharge + extraCharge;
            }
        }
        console.log('cost :', cost)
        data.cost = cost; // setting the cost at db
        Swal.fire({
            title: "Agree with the Cost?",
            text: `You will be charged ${cost} taka!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I agree!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    // save tha parcel info into the database
                    axiosSecure.post('parcels', data)
                        .then(res => {
                            console.log('after saving data :',res.data)
                        })

                    Swal.fire({
                        title: "Confirmed!",
                        text: "Your parcel has been confirmed.",
                        icon: "success"
                    });
                }
            });
    };

    const inputClasses =
        "w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-400";

    return (
        <div className="my-8 p-6 bg-white shadow-md rounded-xl space-y-6">

            <div>
                <h3 className="text-3xl font-bold">Send A Parcel</h3>
                <h2 className="text-xl font-semibold text-gray-700">Enter your parcel details</h2>
            </div>

            <form onSubmit={handleSubmit(handleSendParcel)} className="space-y-6">

                {/* parcel type */}
                <div className="space-y-2">
                    <p className="text-lg font-semibold">Parcel Type</p>

                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                {...register('parcelType')}
                                value="document"
                                className="radio"
                                defaultChecked
                            />
                            <span>Document</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                {...register('parcelType')}
                                value="non-document"
                                className="radio"
                            />
                            <span>Non-document</span>
                        </label>
                    </div>
                </div>

                {/* parcel info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <fieldset>
                        <label className="font-semibold">Parcel Name</label>
                        <input
                            type='text'
                            {...register("parcelName")}
                            placeholder="Enter parcel name"
                            className={inputClasses}
                        />
                    </fieldset>

                    <fieldset>
                        <label className="font-semibold">Parcel Weight (kg)</label>
                        <input
                            type='number'
                            {...register("parcelWeight")}
                            placeholder="Enter weight"
                            className={inputClasses}
                        />
                    </fieldset>
                </div>

                {/* sender & receiver */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* sender */}
                    <div className="p-5 shadow-2xl rounded-lg space-y-4 bg-gray-50">
                        <h3 className="text-lg font-semibold">Sender Information</h3>

                        <fieldset>
                            <label className="font-semibold">Sender Name</label>
                            <input
                                defaultValue={user?.displayName}
                                {...register("senderName")}
                                placeholder="Enter sender name"
                                className={inputClasses}
                            />
                        </fieldset>

                        <fieldset>
                            <label className="font-semibold">Sender Address</label>
                            <input
                                type='text'
                                {...register("senderAddress")}
                                placeholder="Enter sender address"
                                className={inputClasses}
                            />
                        </fieldset>

                        {/* Region (বিভাগ) */}

                        <fieldset className="fieldset">
                            <label className=" text-base font-semibold text-gray-700">Sender Region</label>
                            <select {...register('senderRegion')} defaultValue="Pick a Region" className="select">
                                <option disabled={true}>Pick a Region</option>
                                {
                                    regions.map((r, index) => <option key={index} value={r}> {r} </option>)
                                }

                            </select>
                            <span className="label">Optional</span>
                        </fieldset>

                        {/* District */}

                        <fieldset>
                            <legend className="fieldset-legend">Sender District</legend>
                            <select {...register('senderDistrict')} defaultValue="Pick a District" className="select">
                                <option disabled={true}>Pick a District</option>
                                {
                                    districtByRegion(senderRegion).map((r, index) => <option key={index} value={r}> {r} </option>)
                                }
                            </select>
                        </fieldset>

                        <fieldset>
                            <label className="font-semibold">Sender Email</label>
                            <input type='email'
                                defaultValue={user?.email} 
                                {...register("senderEmail")}
                                placeholder="Add Sender email "
                                className={inputClasses}
                            />
                        </fieldset>

                        <fieldset>
                            <label className="font-semibold">Pickup Warehouse</label>
                            <input type='text'
                                {...register("senderWarehouse")}
                                placeholder="Enter warehouse name"
                                className={inputClasses}
                            />
                        </fieldset>

                        <fieldset>
                            <label className="font-semibold">Sender Contact No.</label>
                            <input type='number'
                                {...register("senderPhone")}
                                placeholder="Enter sender phone number"
                                className={inputClasses}
                            />
                        </fieldset>
                    </div>


                    {/* receiver */}
                    {/* receiver */}
                    <div className="p-5 shadow-2xl rounded-lg space-y-4 bg-gray-50">
                        <h3 className="text-lg font-semibold">Receiver Information</h3>

                        <fieldset>
                            <label className="font-semibold">Receiver Name</label>
                            <input
                                {...register("receiverName")}
                                placeholder="Enter receiver name"
                                className={inputClasses}
                            />
                        </fieldset>

                        <fieldset>
                            <label className="font-semibold">Receiver Address</label>
                            <input
                                {...register("receiverAddress")}
                                placeholder="Enter receiver address"
                                className={inputClasses}
                            />
                        </fieldset>

                        {/* receiver region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-base font-semibold text-gray-700">Receiver Regions</legend>
                            <select {...register('receiverRegion')} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* receiver district */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-base font-semibold text-gray-700">Receiver District</legend>
                            <select {...register('receiverDistrict')} defaultValue="Pick a district" className="select">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                                }
                            </select>
                        </fieldset>

                        <fieldset>
                            <label className="font-semibold">Receiver Email</label>
                            <input
                                type='email'
                                {...register("receiverEmail")}
                                placeholder="Add receiver email"
                                className={inputClasses}
                            />
                        </fieldset>

                        <fieldset>
                            <label className="font-semibold">Delivery Warehouse</label>
                            <input
                                {...register("receiverWarehouse")}
                                placeholder="Enter warehouse name"
                                className={inputClasses}
                            />
                        </fieldset>

                        <fieldset>
                            <label className="font-semibold">Receiver Contact No.</label>
                            <input type='number'
                                {...register("receiverPhone")}
                                placeholder="Enter receiver phone number"
                                className={inputClasses}
                            />
                        </fieldset>
                    </div>


                </div>

                <button
                    type="submit"
                    className="btn bg-primary text-black px-6 py-3 rounded-lg font-semibold"
                >
                    Send Parcel
                </button>
            </form>
        </div>
    );
};

export default SendParcel;
