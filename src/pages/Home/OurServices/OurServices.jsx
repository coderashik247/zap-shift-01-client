import image from "../../../assets/images/service.png";
const services = [
  {
    title: "Express & Standard Delivery",
    desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    img: {image},
    bg: "white",
  },
  {
    title: "Nationwide Delivery",
    desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    ima:{image},
    bg: "white",
  },
  {
    title: "Fulfillment Solution",
    desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    img:{image},
    bg: "white",
  },
  {
    title: "Cash on Home Delivery",
    desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    img: {image},
    bg: "white",
  },
  {
    title: "Corporate Service / Contract In Logistics",
    desc: "Customized corporate services which includes warehouse and inventory management support.",
    img: {image},
    bg: "white",
  },
  {
    title: "Parcel Return",
    desc: "Through our reverse logistics facility we allow customers to return or exchange their products with online business merchants.",
    img: {image},
    bg: "white",
  },
];

export default function OurServices() {
  return (
    <section className=" bg-secondary rounded-2xl py-20 my-10">
      {/* Title */}
      <div className="text-center text-white mb-10">
        <h2 className="text-4xl font-bold">Our Services</h2>
        <p className="max-w-2xl mx-auto mt-3">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {services.map((item, i) => (
          <div
            key={i}
            className="rounded-3xl p-8 shadow-lg border border-gray-100 text-center hover:bg-primary bg-white"
            
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <img src={image} className="w-14 h-14" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-[#063C3B] mb-3">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
