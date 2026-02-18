import {
  FaSchool,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaChartLine,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Register School",
      description:
        "Admin registers the school and configures academic structure, departments, and sessions.",
      icon: <FaSchool />,
    },
    {
      id: "02",
      title: "Add Teachers & Students",
      description:
        "Securely onboard teachers, students, and staff with role-based access control.",
      icon: <FaUserGraduate />,
    },
    {
      id: "03",
      title: "Manage Academic Activities",
      description:
        "Handle attendance, assignments, exams, and results from a centralized dashboard.",
      icon: <FaChalkboardTeacher />,
    },
    {
      id: "04",
      title: "Track Performance & Reports",
      description:
        "Monitor performance analytics and generate detailed academic reports.",
      icon: <FaChartLine />,
    },
  ];

  return (
    <section className="relative py-24 px-6 lg:px-20 bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
      {/* Decorative Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/20 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
        <p className="mb-16 max-w-2xl mx-auto text-blue-100">
          Our School Management Platform simplifies academic and administrative
          operations through a structured and intelligent workflow.
        </p>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-white/30"></div>

          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Animated Connector Dot */}
              <div className="hidden lg:flex absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full border-4 border-indigo-600 z-10"></div>

              <div
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-lg 
                              hover:scale-105 hover:bg-white/20 transition duration-500"
              >
                {/* Icon */}
                <div className="text-4xl mb-4 text-white flex justify-center group-hover:rotate-12 transition duration-500">
                  {step.icon}
                </div>

                {/* Step Number */}
                <div className="text-sm font-semibold text-blue-200 mb-2">
                  Step {step.id}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>

                {/* Description */}
                <p className="text-blue-100 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
