import { Card, CardContent } from "../components/Card";

const teamData = {
  "Chief Patron": [
    {
      name: "Dr. G Viswanathan",
      role: "Chancellor",
      image: "/VIT_Founder.jpg",
      email: "chancellor@vit.ac.in",
    },
  ],
  Patrons: [
    {
      name: "Mr. Sankar Viswanathan",
      role: "Vice President",
      image: "/vpa_small.jpg",
      email: "vp@vit.ac.in",
    },
    {
      name: "Dr. Sekar Viswanathan",
      role: "Vice President",
      image: "Sekar-Sir.jpg",
      email: "vp2@vit.ac.in",
    },
    {
      name: "Dr. G V Selvam",
      role: "Vice President",
      image: "gvs.jpg",
      email: "selvam@vit.ac.in",
    },
  ],
  "Co-Patrons": [
    {
      name: "Dr. Kanchana Bhaaskaran V. S",
      role: "Vice Chancellor",
      image: "ProVCadmn.jpg",
      email: "vc@vit.ac.in",
    },
    {
      name: "Dr. T. Thyagarajan",
      role: "Pro-Vice Chancellor",
      image: "53595-Dr.-Thyagarajan-T.jpg",
      email: "vc@vit.ac.in",
    },
    {
      name: "Dr. K. Sathiyanarayanan",
      role: "Director, Chennai Campus",
      image: "Director-copy.jpg",
      email: "vc@vit.ac.in",
    },
    {
      name: "Dr. P. K. Manoharan",
      role: "Additional Registrar, Chennai Campus",
      image: "ara.jpg",
      email: "vc@vit.ac.in",
    },
  ],
  Convenor: [
    {
      name: "Dr. Ganesh Narayanan",
      role: "Convenor",
      email: "convenor.technoVIT@vit.ac.in",
    },
  ],
  "Co-Convenors": [
    {
      name: "Dr. Jayasudha M",
      role: "Co-Convenor",
      email: "coconvenor.technoVIT@vit.ac.in",
    },
    {
      name: "Dr. Joseph Daniel",
      role: "Co-Convenor",
      email: "coconvenor.technoVIT@vit.ac.in",
    },
  ],
  "Faculty Organizers": [
    { name: "Dr. P. Sriramalakshmi", role: "Campus Decoration" },
    { name: "Dr. S. Devi Yamini", role: "Design and Printing" },
    { name: "Dr. Arivarasi A", role: "Design and Printing" },
    { name: "Dr. Chendur Kumaran R", role: "Documentation" },
    { name: "Dr. Bhuvaneswari", role: "Documentation" },
    { name: "Dr. Arun Kumar A", role: "Events" },
    { name: "Dr. Sivakumar K", role: "Finance" },
    { name: "Dr. Vasugi K", role: "Finance" },
    { name: "Dr. Imran D", role: "Guest Care & Accommodation" },
    { name: "Dr. Ravi Prakash Dwivedi", role: "Guest Care & Accommodation" },
    { name: "Dr. Umadevi", role: "Press and Media" },
    { name: "Dr. Chandramauleshwar Roy", role: "Publicity and Marketing" },
    { name: "Dr. Umayal C", role: "Publicity and Marketing" },
    { name: "Dr. Suganya R", role: "Purchase" },
    { name: "Dr. Dhivya M", role: "Registration & Reception" },
    { name: "Dr. Shanthi Krishna", role: "Registration & Reception" },
    { name: "Dr. Priyadharshini M", role: "Sales / Merchandise" },
    { name: "Dr. Vasanth Kumar D", role: "Sales / Merchandise" },
    { name: "Dr. D. Rekha", role: "Special Shows / Premium Events" },
    { name: "Dr. Praveen Joe I R", role: "Sponsorship & MoU" },
    { name: "Dr. Padamavathy C", role: "Sponsorship & MoU" },
    {
      name: "Dr. Daisy Gohan A I",
      role: "Stage arrangements (Inaugural / Valedictory)",
    },
    {
      name: "Dr. Radha R",
      role: "Stage arragements (Inaugural / Valedictory)",
    },
    { name: "Dr. Senthilpandian M", role: "Stalls and Expo" },
    { name: "Dr. Giridaran A", role: "Stalls and Expo" },
    { name: "Dr. Braveen M", role: "Venue arrangements and Refreshments" },
    { name: "Dr. Balamurugan B J", role: "Venue arragements and Refreshments" },
    { name: "Dr. M. Prasad", role: "Web and Technical Team" },
  ],
  "Student Organizers": [
    { name: "Shreya Ranjitha M", role: "Ambience" },
    { name: "Preksha Chaudhary", role: "Design" },
    { name: "Jefrey Jose D", role: "Documentation" },
    { name: "Nauroz Rahim Khan", role: "Documentation" },
    { name: "Priyanjali", role: "Events" },
    { name: "Naman Goel", role: "Events" },
    { name: "M. Harini", role: "Finance" },
    { name: "Sriram S V", role: "Finance" },
    { name: "Shruthi Reddy", role: "Guest Care" },
    { name: "Dhanya V", role: "Merchandize" },
    { name: "Shaheen", role: "Press & Media" },
    { name: "Divakaran Babu", role: "Publicity and Marketing" },
    { name: "Malaviha K", role: "Publicity and Marketing" },
    { name: "Drahvidan Chittarasan", role: "Purchase" },
    { name: "Divya Joyeeta Ghosh", role: "Purchase" },
    { name: "S Harini", role: "Registration" },
    { name: "Tomoghna Das", role: "Registration" },
    { name: "Shobini G", role: "Special Events" },
    { name: "Janamejayan B M", role: "Special Events" },
    { name: "Rohin S", role: "Special Events" },
    { name: "H Monish Raj", role: "Stalls" },
    { name: "Lakshya Agarwal", role: "Stalls" },
    { name: "Parinitha Srisha", role: "Stage" },
    { name: "Yusra Inam", role: "Venue Management" },
    { name: "Aayath Hussain Parvez", role: "Venue Management" },
    { name: "Aayush Shukla", role: "Website" },
  ],
};

export const Team = () => {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl font-heading text-white mb-4">
            Our Team
          </h1>
          <div className="w-20 h-1 bg-[#00ff00] mx-auto mb-6"></div>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Meet the dedicated team behind technoVIT&apos;25
          </p>
        </div>

        <div className="space-y-16">
          {Object.entries(teamData).map(
            ([category, members], categoryIndex) => (
              <div
                key={category}
                className="animate-slide-up"
                style={{ animationDelay: `${categoryIndex * 100}ms` }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-subheading text-white mb-2">
                    {category}
                  </h2>
                  <div className="w-16 h-0.5 bg-[#00ff00]"></div>
                </div>

                <div
                  className={`
                  grid gap-6
                  ${members.length === 1 ? "grid-cols-1 max-w-md mx-auto" : ""}
                  ${
                    members.length === 2
                      ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
                      : ""
                  }
                  ${
                    members.length === 3
                      ? "grid-cols-1 sm:grid-cols-3 max-w-3xl mx-auto"
                      : ""
                  }
                  ${
                    members.length === 4
                      ? "grid-cols-1 sm:grid-cols-4 lg:grid-cols-4"
                      : ""
                  }
                  ${
                    members.length > 5
                      ? "grid-cols-1 sm:grid-cols-3 max-w-5xl mx-auto"
                      : ""
                  }

                `}
                >
                  {members.map((member, index) => (
                    <Card key={index} className="group">
                      <div className="relative overflow-hidden">
                        {(member as { image?: string }).image && (
                          <img
                            src={(member as { image: string }).image}
                            alt={member.name}
                            className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <CardContent className="text-center">
                        <h3 className="text-lg font-subheading text-white mb-1 uppercase">
                          {member.name}
                        </h3>

                        <p className="text-sm text-[#00ff00] mb-3 uppercase tracking-wide">
                          {member.role}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {categoryIndex < Object.entries(teamData).length - 1 && (
                  <div className="mt-12 border-t border-border"></div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
