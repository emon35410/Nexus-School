const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Register School",
      description:
        "Admin registers the school and sets up academic structure including classes, departments, and sessions.",
    },
    {
      id: "02",
      title: "Add Teachers & Students",
      description:
        "Admin adds teachers, students, and staff with role-based access control and secure login credentials.",
    },
    {
      id: "03",
      title: "Manage Daily Activities",
      description:
        "Teachers manage attendance, assignments, exams, and results while students track their academic progress.",
    },
    {
      id: "04",
      title: "Monitor & Communicate",
      description:
        "Parents and administrators monitor performance, receive notifications, and stay connected in real-time.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-600 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Our School Management Platform simplifies academic and administrative
          processes through a smart and structured workflow.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition duration-300"
            >
              <div className="text-blue-600 text-3xl font-bold mb-4">
                {step.id}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
