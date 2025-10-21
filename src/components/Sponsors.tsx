interface Sponsor {
  name: string;
  logoUrl: string;
  hoverBorderColor: string;
}

interface SponsorCategory {
  title: string;
  sponsors: Sponsor[];
}

const sponsorData: SponsorCategory[] = [
  {
    title: "Title Sponsors",
    sponsors: [
      {
        name: "HCL Tech",
        logoUrl: "https://cdn.a2ys.dev/images/hcltech-new-logo.svg",
        hoverBorderColor: "hover:border-blue-500",
      },
    ],
  },
  {
    title: "FM Partner",
    sponsors: [
      {
        name: "Hello FM",
        logoUrl: "https://cdn.a2ys.dev/images/hellofm-logo.png",
        hoverBorderColor: "hover:border-purple-500",
      },
    ],
  },
];

export const Sponsors = () => {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {sponsorData.map((category) => (
          <section key={category.title} className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-white bg-clip-text text-transparent">
              {category.title}
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {category.sponsors.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className={`w-64 h-32 border-2 border-gray-700 rounded-lg flex items-center justify-center p-4 ${sponsor.hoverBorderColor} transition-colors`}
                >
                  <img
                    src={sponsor.logoUrl}
                    alt={`${sponsor.name} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
