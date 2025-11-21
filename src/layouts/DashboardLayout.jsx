import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { GoSidebarCollapse } from 'react-icons/go';
import { IoHome } from 'react-icons/io5';
import { LuSettings2 } from 'react-icons/lu';
import { Link, NavLink, Outlet } from 'react-router';

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <GoSidebarCollapse size={24} />
                    </label>
                    <div className="px-4">ZapShift Dashboard</div>
                </nav>
                {/* Page content here */}

                <Outlet></Outlet>

            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li>
                            <Link to={'/'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                {/* Home icon */}
                                <IoHome size={24} />
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>
                        {/* our dashboard links */}
                        <li>
                            <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="MyParcels" to="/dashboard/my-parcels">
                                <CiDeliveryTruck size={24} />
                                <span className="is-drawer-close:hidden">My Parcels</span>
                            </NavLink>
                        </li>

                        {/* List item */}
                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                {/* Settings icon */}
                                <LuSettings2 size={24} />
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;