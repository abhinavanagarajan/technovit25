// components/Sponsors.tsx
export const Sponsors = () => {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title Sponsors Section */}
        <section className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-white bg-clip-text text-transparent">
            Title Sponsors
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <div className="w-64 h-32 border-2 border-gray-700 rounded-lg flex items-center justify-center hover:border-blue-500 transition-colors">
              <img src="https://cdn.a2ys.dev/images/hcltech-new-logo.svg" />
            </div>
          </div>
        </section>

        {/* FM Partner Section */}
        <section>
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-white bg-clip-text text-transparent">
            FM Partner
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {/* Placeholder for FM partner logo */}
            <div className="w-64 h-32 border-2 border-gray-700 rounded-lg flex items-center justify-center hover:border-purple-500 transition-colors">
              <img src="https://cdn.a2ys.dev/images/hellofm-logo.png" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
