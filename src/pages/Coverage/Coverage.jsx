import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const position = [23.6850, 90.3563] // latitude and longitude of bangladesh
    const serviceCenters = useLoaderData();
    const mapRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const location = e.target.location.value;
        const district = serviceCenters.find(center => center.district.toLowerCase().includes(location.toLowerCase()))
        if (district) {
            const coord = [district.latitude, district.longitude];
            console.log(district, coord)
            // go to the location
            mapRef.current.flyTo(coord, 14);
        }
    }

    return (
        <div className='my-10'>
            <h2 className="text-5xl font-bold text-center">We are available in 64 districts</h2>
            {/* search */}
            <div className='p-6'>
                <form onSubmit={handleSearch}>
                    <label className="input flex items-center gap-3 bg-white border rounded-xl shadow-sm px-4 py-3">
                        <svg
                            className="h-5 w-5 opacity-60"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>

                        <input
                            type="search"
                            name="location"
                            className="grow outline-none"
                            placeholder="Search district…"
                        />

                        {/* Improved Search Button */}
                        <button
                            className="px-5 py-2 rounded-lg bg-linear-to-r from-amber-400 to-yellow-500 
                       text-white font-semibold hover:from-yellow-500 hover:to-amber-400 
                       transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Search
                        </button>
                    </label>
                </form>


            </div>
            {/* map */}
            <div className='min-h-screen w-full border-2 mt-2'>
                <MapContainer
                    className='min-h-screen'
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* main functionality */}
                    {/* marker is the location symbol */}

                    {
                        serviceCenters.map((center, index) =>
                            <Marker position={[center.latitude, center.longitude]} key={index}>
                                <Popup>
                                    <strong>{center.district}</strong> <br /> Service Area: {center.covered_area.join(', ')}.
                                </Popup>
                            </Marker>
                        )
                    }

                </MapContainer>
            </div>
        </div>

    );
};

export default Coverage;
