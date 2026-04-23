import { FaSave } from "react-icons/fa";

const SaveButton = () => {
    return (
        <div>
            <button className='text-[#7065F0] border-[#7065F0] w-24 border rounded-lg px-5 py-2 font-bold flex items-center gap-2 bg-[#7065F02B]'>
                {/* <FaPencilAlt></FaPencilAlt> */}
                <FaSave className="" />
                <span>Save</span>
            </button>
        </div>
    );
};

export default SaveButton;
