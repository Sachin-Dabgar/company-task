import React from "react";
import { menuItems } from "../utils/common";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-full bg-gray-200 h-[60px] flex flex-row items-center justify-around gap-5 lg:h-screen lg:w-64 lg:flex-col lg:justify-start lg:pt-7">
            {menuItems.map((item) => {
                return (
                    <NavLink
                        key={item?.id}
                        to={item?.link}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-neutral-900 w-full text-center py-3 text-white font-semibold uppercase cursor-pointer"
                                : "bg-slate-600 w-full text-center py-3 text-white font-semibold uppercase cursor-pointer"
                        }
                    >
                        <p>{item?.name}</p>
                    </NavLink>
                );
            })}
        </div>
    );
};

export default Sidebar;
