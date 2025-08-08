export default function Services() {
  const services = [
    {
      id: 1,
      title: "Organ Matching",
      description:
        "Advanced AI-powered matching system to connect compatible donors and recipients quickly and accurately.",
      image: "🫀",
      bgColor: "bg-gradient-to-br from-red-900/20 to-red-800/30",
      iconColor: "text-red-400",
      borderColor: "border-red-500/30",
    },
    {
      id: 2,
      title: "Donor Registration",
      description:
        "Simple and secure donor registration process with comprehensive medical screening and verification.",
      image: "🩸",
      bgColor: "bg-gradient-to-br from-green-900/20 to-green-800/30",
      iconColor: "text-green-400",
      borderColor: "border-green-500/30",
    },
    {
      id: 3,
      title: "Recipient Support",
      description:
        "Complete support system for organ recipients including pre and post-transplant care coordination.",
      image: "🏥",
      bgColor: "bg-gradient-to-br from-blue-900/20 to-blue-800/30",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/30",
    },
    {
      id: 4,
      title: "Medical Coordination",
      description:
        "24/7 medical coordination between hospitals, donors, and recipients for seamless transplant procedures.",
      image: "🚑",
      bgColor: "bg-gradient-to-br from-orange-900/20 to-orange-800/30",
      iconColor: "text-orange-400",
      borderColor: "border-orange-500/30",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connecting life-saving organ donors with recipients through our
            comprehensive platform designed to save lives efficiently and
            securely.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`bg-gray-800/50 backdrop-blur-sm border ${service.borderColor} rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group hover:scale-105`}
            >
              <div
                className={`${service.bgColor} p-6 flex justify-center items-center h-32 group-hover:scale-105 transition-transform duration-300`}
              >
                <span className="text-6xl filter drop-shadow-lg">
                  {service.image}
                </span>
              </div>
              <div className="p-6">
                <h3
                  className={`text-xl font-semibold ${service.iconColor} mb-3`}
                >
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {service.description}
                </p>
                <button
                  className={`${service.iconColor} hover:text-white font-medium transition-colors group-hover:underline`}
                >
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
