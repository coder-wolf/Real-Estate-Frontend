
const SliderCard = ({ house }) => {
    const {
        id,
        estate_title,
        image_url,
        location,
    } = house;

    return (
        <div className="border-2 border-gray-300 rounded-xl relative">
            <img
                className="border-white border-8 rounded-2xl aspect-[3/4] object-cover"
                src={image_url}
                // src="https://cdn.houseplansservices.com/content/h0rig2dbr8vsg0fcgqco7acmul/w991x660.jpg?v=9"
                alt="" />
            <div className="bottom-1 right-1 absolute text-white text-end p-6 pb-8">
                {/* <h2 className="text-4xl font-semibold pb-2">St. Cristal</h2>
                <p className="">1234 Maple Street, Sunnyvale, CA</p> */}
                <h2 className="text-4xl font-semibold pb-2">{estate_title}</h2>
                <p className="">{location}</p>
            </div>

        </div>
    );
};

export default SliderCard;