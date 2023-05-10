import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import notFound from "../assets/notFound.svg";
import { useDispatch, useSelector } from "react-redux";
import ContactCard from "../components/ContactCard";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { addContact } from "../redux/slices/contactSlice";

const Contacts = () => {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    // getting contacts from store
    const contacts = useSelector((state: any) => state.contact);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [status, setStatus] = useState("");

    const addContactHandler = (e: any) => {
        e.preventDefault();
        if (firstName !== "" && lastName !== "" && status !== "") {
            const id = nanoid();
            const data = {
                id,
                firstName,
                lastName,
                status,
            };
            dispatch(addContact(data));
            toast.success("Contact Added");
            setShowModal(false);
            setFirstName("");
            setLastName("");
            setStatus("");
        } else {
            toast.error("Fill all the details");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row">
            <Sidebar />
            <div className="w-full flex justify-center lg:w-[1160px] py-6">
                <div>
                    <div className="flex items-center justify-center">
                        <button
                            className="uppercase m-auto bg-slate-600 text-white rounded-sm py-2 px-4 hover:bg-slate-800"
                            onClick={() => setShowModal(true)}
                        >
                            Create Contact
                        </button>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col justify-center items-center lg:m-0 m-5">
                            {contacts?.items?.length > 0 ? (
                                // render list if length is greater than 0
                                <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 mt-10 ">
                                    {contacts.items?.map((item: any) => (
                                        <ContactCard
                                            details={item}
                                            key={item?.id}
                                        />
                                    ))}
                                </div>
                            ) : (
                                // if no contacts are available
                                <div className="mt-10 border border-primary p-5 rounded flex items-center gap-5">
                                    <img
                                        className="w-[56px] h-[56px]"
                                        src={notFound}
                                        alt={notFound}
                                    />
                                    <p className="text-start text-primary font-medium">
                                        No contacts found!
                                        <br />
                                        Please add contact from <br /> Create
                                        Contact Button
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* modal */}
                {showModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-5">
                            <div className="relative w-full sm:w-[50%] mx-auto max-w-6xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#202020] outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="font-semibold text-white">
                                            New Contact
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 float-right text-3xl  font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className=" h-6 w-6 text-xl block outline-none text-white focus:outline-none">
                                                X
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">
                                        <form
                                            className="flex flex-col w-full"
                                            onSubmit={addContactHandler}
                                        >
                                            <label htmlFor="firstname">
                                                <span className="text-white text-xl">
                                                    First Name:
                                                </span>
                                                <input
                                                    onChange={(e) =>
                                                        setFirstName(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={firstName}
                                                    className="w-full p-2 focus:outline-none"
                                                    type="text"
                                                    name="firstname"
                                                    id="firstname"
                                                    placeholder="Enter Firstname"
                                                    required
                                                />
                                            </label>

                                            <label
                                                htmlFor="lastname"
                                                className="mt-5"
                                            >
                                                <span className="text-white text-xl">
                                                    Last Name:
                                                </span>
                                                <input
                                                    onChange={(e) =>
                                                        setLastName(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={lastName}
                                                    className="w-full p-2 focus:outline-none"
                                                    type="text"
                                                    name="lastname"
                                                    id="lastname"
                                                    placeholder="Enter Lastname"
                                                    required
                                                />
                                            </label>
                                            <div className="text-white mt-5">
                                                <p className="text-xl">
                                                    Select Status:
                                                </p>
                                                <div className="mt-2 text-xl flex gap-2">
                                                    <input
                                                        onChange={(e) =>
                                                            setStatus(
                                                                e.target.value
                                                            )
                                                        }
                                                        type="radio"
                                                        value="active"
                                                        name="status"
                                                    />
                                                    Active
                                                    <input
                                                        onChange={(e) =>
                                                            setStatus(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="ml-4"
                                                        type="radio"
                                                        value="inactive"
                                                        name="status"
                                                    />
                                                    Inactive
                                                </div>
                                            </div>
                                            <div className="mt-5">
                                                <button className="bg-green-600 text-white py-2 rounded-md text-xl font-semibold cursor-pointer px-4 uppercase">
                                                    Add
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    {/*footer*/}
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default Contacts;
