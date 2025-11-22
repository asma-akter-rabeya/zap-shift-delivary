import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {
    const { register, handleSubmit, control } = useForm();
    const serviceCenter = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Extract unique regions
    const regionsDuplicate = serviceCenter.map(center => center.region);
    const regions = [...new Set(regionsDuplicate)];

    // Watch dynamic region changes
    const senderRegion = useWatch({ control, name: 'senderRegion' });
    const receiverRegion = useWatch({ control, name: 'receiverRegion' });

    // Get districts based on region
    const districtByRegion = (region) => {
        const regionDistrict = serviceCenter.filter(c => c.region === region);
        return regionDistrict.map(d => d.district);
    };

    // Handle form submit
    const handleSendParcel = (data) => {
        const isDocument = data.parcelType === 'document';
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);

        let cost = 0;

        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        } else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            } else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict
                    ? extraWeight * 40
                    : extraWeight * 40 + 40;

                cost = minCharge + extraCharge;
            }
        }

        data.cost = cost;

        Swal.fire({
            title: "Agree with the Cost?",
            text: `You will be charged ${cost} taka!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and Continue Payment!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/parcels', data).then(res => {
                    if (res.data.insertedId) {
                        navigate('/dashboard/my-parcels');
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Parcel has been created. Please Pay.",
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }
                });
            }
        });
    };

    // Common input styling
    const inputClasses =
        "w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-400";

    return (
        <div className="my-8 p-6 bg-white shadow-md rounded-xl space-y-6">

            <div>
                <h3 className="text-3xl font-bold">Send A Parcel</h3>
                <h2 className="text-xl font-semibold text-gray-700">
                    Enter your parcel details
                </h2>
            </div>

            <form onSubmit={handleSubmit(handleSendParcel)} className="space-y-6">

                {/* Parcel Type */}
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

                {/* Parcel Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <fieldset>
                        <label className="font-semibold">Parcel Name</label>
                        <input
                            type="text"
                            {...register("parcelName")}
                            placeholder="Enter parcel name"
                            className={inputClasses}
                        />
                    </fieldset>

                    <fieldset>
                        <label className="font-semibold">Parcel Weight (kg)</label>
                        <input
                            type="number"
                            {...register("parcelWeight")}
                            placeholder="Enter weight"
                            className={inputClasses}
                        />
                    </fieldset>
                </div>

                {/* Sender & Receiver */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Sender */}
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
                                type="text"
                                {...register("senderAddress")}
                                placeholder="Enter sender address"
                                className={inputClasses}
                            />
                        </fieldset>

                        <fieldset>
                            <label className="font-semibold">Sender Region</label>
                            <select {...register('senderRegion')} className="select">
                                <option disabled selected>Pick a Region</option>
                                {regions.map((r, i) => (
                                    <option key={i} value={r}>{r}</option>
                                ))}
                            </select>
                        </fieldset>

                        <fieldset>
                            <label className="font-semibold">Sender District</label>
                            <select {...register('senderDistrict')} className="select">
                                <option disabled selected>Pick a District</option>
                                {districtByRegion(senderRegion).map((d, i) => (
                                    <option key={i} value={d}>{d}</option>
                                ))}
                            </select>
                        </fieldset>

                        <fieldset>
                            <label className="font-semibold">Sender Email</label>
                            <input
                                type="email"
                                defaultValue={user?.email}
                                {...register("senderEmail")}
                                placeholder="Enter sender email"
                                className={inputClasses}
                            />
                        </fieldset>

                        <fieldset>
                            <label className="font-semibold">Pickup Warehouse</label>
                            <input
                                type="text"
                                {...register("senderWarehouse")}
                                placeholder="Enter warehouse name"
                                className={inputClasses}
                            />
                        </fieldset>

                        <fieldset>
                            <label className="font-semibold">Sender Contact No.</label>
                            <input
                                type="number"
                                {...register("senderPhone")}
                                placeholder="Enter sender phone number"
                                className={inputClasses}
                            />
                        </fieldset>
                    </div>

                    {/* Receiver */}
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

                        <fieldset>
                            <label className="font-semibold">Receiver Region</label>
                            <select {...register('receiverRegion')} className="select">
                                <option disabled selected>Pick a Region</option>
                                {regions.map((r, i) => (
                                    <option key={i} value={r}>{r}</option>
                                ))}
                            </select>
                        </fieldset>

                        <fieldset>
                            <label className="font-semibold">Receiver District</label>
                            <select {...register('receiverDistrict')} className="select">
                                <option disabled selected>Pick a District</option>
                                {districtByRegion(receiverRegion).map((d, i) => (
                                    <option key={i} value={d}>{d}</option>
                                ))}
                            </select>
                        </fieldset>

                        <fieldset>
                            <label className="font-semibold">Receiver Email</label>
                            <input
                                type="email"
                                {...register("receiverEmail")}
                                placeholder="Enter receiver email"
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
                            <input
                                type="number"
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
