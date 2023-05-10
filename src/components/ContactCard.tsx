import { useState } from "react";
import { useDispatch } from "react-redux";
import { AiFillEye } from "react-icons/ai";
import { deleteContact, updateContact } from "../redux/slices/contactSlice";
import { toast } from "react-toastify";

const ContactCard = ({ details }: any) => {
    // state for managing modal action
    const [showDetailsModal, setShowdetailsModal] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);

    const dispatch = useDispatch();

    // getting contacts from store
    // const contacts = useSelector((state: any) => state.contact);

    const [firstName, setFirstName] = useState(details.firstName);
    const [lastName, setLastName] = useState(details.lastName);
    const [status, setStatus] = useState(details.status);

    const addContactHandler = (e: any) => {
        e.preventDefault();
        if (firstName !== "" && lastName !== "" && status !== "") {
            // const id = nanoid();
            const data = {
                id: details.id,
                firstName,
                lastName,
                status,
            };
            dispatch(updateContact(data));
            toast.success("Contact Updated");
            setShowFormModal(false);
        } else {
            toast.error("Error");
        }
    };

    return (
        <div className="lg:w-[300px] w-[250px] border border-white text-white bg-neutral-600 p-5 rounded shadow-md">
            <div className="text-xl flex items-center justify-between">
                <span>
                    {details.firstName} {details.lastName}
                </span>
                <span>
                    <AiFillEye
                        className="text-2xl cursor-pointer hover:scale-125 transition-all duration-200"
                        onClick={() => setShowdetailsModal(true)}
                    />
                </span>
            </div>
            <div className="mt-4 flex gap-3">
                <button
                    onClick={() => setShowFormModal(true)}
                    className="hover:bg-blue-600 bg-blue-500 px-4 py-2 rounded-md uppercase font-semibold"
                >
                    Edit
                </button>
                <button
                    onClick={() => dispatch(deleteContact(details.id))}
                    className="hover:bg-red-600 bg-red-500 px-4 py-2 rounded-md uppercase font-semibold"
                >
                    Delete
                </button>
            </div>
            {/* details modal */}
            {showDetailsModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-5">
                        <div className="relative w-full sm:w-[50%] mx-auto max-w-6xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#202020] outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="font-semibold text-white">
                                        User Details
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 float-right text-3xl  font-semibold outline-none focus:outline-none"
                                        onClick={() =>
                                            setShowdetailsModal(false)
                                        }
                                    >
                                        <span className=" h-6 w-6 text-xl block outline-none text-white focus:outline-none">
                                            X
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p>First Name: {details.firstName}</p>
                                    <p>Last Name: {details.lastName}</p>
                                    <p>Status: {details.status}</p>
                                </div>
                                {/*footer*/}
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            {/* modal */}
            {showFormModal ? (
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
                                        onClick={() => setShowFormModal(false)}
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
                                                    setFirstName(e.target.value)
                                                }
                                                value={firstName}
                                                className="w-full p-2 focus:outline-none text-black"
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
                                                    setLastName(e.target.value)
                                                }
                                                value={lastName}
                                                className="w-full p-2 focus:outline-none text-black"
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
                                                    checked={
                                                        status === "active"
                                                            ? true
                                                            : false
                                                    }
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
                                                    checked={
                                                        status === "inactive"
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                Inactive
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <button className="bg-green-600 text-white py-2 rounded-md text-xl font-semibold cursor-pointer px-4 uppercase">
                                                Edit
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
    );
};

export default ContactCard;
