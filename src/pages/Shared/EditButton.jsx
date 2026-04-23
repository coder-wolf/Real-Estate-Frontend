import { FaPencilAlt } from 'react-icons/fa';

const EditButton = () => {
    return (
        <div>
            <button className='text-[#7065F0] border-[#7065F0] w-24 border rounded-lg px-5 py-2 font-bold flex items-center gap-2 bg-[#7065F01A]'>
                <FaPencilAlt></FaPencilAlt>
                <span>Edit</span>
            </button>
        </div>
    );
};

export default EditButton;
