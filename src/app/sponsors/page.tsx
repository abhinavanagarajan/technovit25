import { SponsorImage } from "@/components/SponsorImage";

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
        logoUrl: "https://cdn.a2ys.dev/images/hcl.jpg",
        hoverBorderColor: "hover:border-blue-500",
      },
    ],
  },
  {
    title: "FM Partner",
    sponsors: [
      {
        name: "Hello FM",
        logoUrl: "https://cdn.a2ys.dev/images/hellofm.jpg",
        hoverBorderColor: "hover:border-purple-500",
      },
    ],
  },
];

const Sponsors = () => {
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
                  className={`relative w-64 h-32 border-2 border-gray-700 rounded-lg p-2 ${sponsor.hoverBorderColor} transition-colors`}
                >
                  <SponsorImage
                    src={sponsor.logoUrl}
                    alt={`${sponsor.name} logo`}
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

export default Sponsors;
