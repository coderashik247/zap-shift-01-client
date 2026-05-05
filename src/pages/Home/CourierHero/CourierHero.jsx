import image from "../../../assets/images/location-merchant.png"

export default function CourierHero() {
  return (
    <div className="w-full flex justify-center px-4 py-10">
      <div className="w-full rounded-3xl p-10 bg-[#003C46] relative overflow-hidden">

        {/* Background decorative pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://i.ibb.co/Z1LhWtQt/be-a-merchant-bg.png')] bg-cover" />

        {/* Wave top glow (optional) */}
        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-cyan-300/20 to-transparent pointer-events-none" />

        <div className="relative grid md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT SECTION */}
          <div>
            <h1 className="text-white text-3xl md:text-4xl font-bold leading-snug">
              Merchant and Customer Satisfaction <br />
              is Our First Priority
            </h1>

            <p className="text-gray-200 mt-4">
              We offer the lowest delivery charge with the highest value along with 
              100% safety of your product. Pathao courier delivers your parcels in
              every corner of Bangladesh right on time.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <button className="btn bg-[#C9F36F] text-gray-900 border-none px-6">
                Become a Merchant
              </button>
              <button className="btn bg-transparent text-[#C9F36F] border-[#C9F36F] px-6">
                Earn with ZapShift Courier
              </button>
            </div>
          </div>

          {/* RIGHT SECTION – box illustration */}
          <div className="flex justify-center items-center">
            <img
              src={image}
              alt="delivery boxes"
              className="w-75 md:w-115 opacity-90"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
