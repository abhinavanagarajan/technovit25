import React, { useState } from 'react';

type FilterSectionProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
};
type FilterButtonProps = {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
};

const FilterButton = ({ children, selected, onClick }: FilterButtonProps) => (
  <button
    onClick={onClick}
    style={{
      padding: '12px 24px',
      border: '2px solid #000',
      backgroundColor: selected ? '#000' : '#42E25A',
      color: selected ? '#42E25A' : '#000',
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      textTransform: 'uppercase'
    }}
  >
    {children}
  </button>
);

const FilterSection = ({ title, children, isOpen, onToggle }: FilterSectionProps) => (
  <div>
    <button
      onClick={onToggle}
      style={{
        width: '100%',
        padding: '20px',
        backgroundColor: '#42E25A',
        borderBottom: '2px solid #000',
        borderTop: '2px solid #000',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer'
      }}
    >
      <span style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#000'
      }}>
        {title}
      </span>
      <span style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#000',
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s'
      }}>
        <svg width="34" height="21" viewBox="0 0 34 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3731 19.4964C18.71 20.1587 17.8112 20.5307 16.874 20.5307C15.9368 20.5307 15.038 20.1587 14.3749 19.4964L1.03531 6.16158C0.37219 5.49815 -0.000220974 4.59846 9.83694e-08 3.66045C0.000221171 2.72244 0.373056 1.82294 1.03649 1.15982C1.69992 0.496703 2.5996 0.124291 3.53761 0.124512C4.47562 0.124733 5.37512 0.497569 6.03824 1.161L16.874 11.9968L27.7098 1.161C28.3764 0.51648 29.2696 0.159597 30.1969 0.167214C31.1241 0.174831 32.0113 0.54634 32.6673 1.20172C33.3233 1.85711 33.6956 2.74393 33.7041 3.67118C33.7126 4.59844 33.3566 5.49193 32.7127 6.15922L19.3755 19.4988L19.3731 19.4964Z" fill="black"/>
        </svg>

      </span>
    </button>
    {isOpen && (
      <div style={{
        padding: '20px',
        backgroundColor: '#70E081'
      }}>
        {children}
      </div>
    )}
  </div>
);

const EventFilter = () => {
  const [openSections, setOpenSections] = useState({
    eventType: true,
    priceRange: true,
    dateTime: true,
    teamSize: true
  });

  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [selectedTeamSizes, setSelectedTeamSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [freeOfCost, setFreeOfCost] = useState(true);

  const toggleSection = (section: any) => {
    setOpenSections((prev: any) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleEventType = (type: any) => {
    setSelectedEventTypes((prev: any) =>
      prev.includes(type)
        ? prev.filter((t: any) => t !== type)
        : [...prev, type]
    );
  };

  const toggleTeamSize = (size: any) => {
    setSelectedTeamSizes((prev: any) =>
      prev.includes(size)
        ? prev.filter((s:any) => s !== size)
        : [...prev, size]
    );
  };

  const eventTypes:string[] = ['WORKSHOP', 'COMPETITION', 'HACKATHON', 'GAMES', 'IDEATHON', 'ENTERTAINMENT'];
  const teamSizes:string[] = ['SOLO', 'DUO', 'TRIO', 'SQUAD', '5+ MEMBERS'];

  return (
    <div style={{
      width: '616px',
      backgroundColor: '#1a1a1a',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid black'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '28px', color: '#70E081' }}>
            <svg width="32" height="32" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.1078 62.9382C24.6843 62.9382 23.3191 62.3727 22.3125 61.3661C21.3059 60.3595 20.7404 58.9943 20.7404 57.5708V28.157L1.57846 9.37078C0.0218899 7.81421 -0.407509 5.50619 0.397613 3.52022C1.20274 1.53425 3.1887 0.192383 5.38937 0.192383H57.615C59.8156 0.192383 61.7479 1.48058 62.553 3.52022C63.3582 5.55986 62.9288 7.81421 61.3722 9.37078L42.2103 28.157V52.2033C42.2103 54.2429 41.0831 56.0679 39.2582 56.9803L28.5232 62.3478C27.7718 62.7772 26.913 62.9382 26.1078 62.9382Z" fill="white"/>
            </svg>
            </span>
          <h2 style={{
            margin: 0,
            color: '#fff',
            fontSize: '28px',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            FILTERS
          </h2>
        </div>
        <button style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: '#FF4500',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          textTransform: 'uppercase'
        }}>
          CLEAR
        </button>
      </div>

      {/* Event Type Section */}
      <FilterSection
        title="EVENT TYPE"
        isOpen={openSections.eventType}
        onToggle={() => toggleSection('eventType')}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px'
        }}>
          {eventTypes.map(type => (
            <FilterButton
              key={type}
              selected={selectedEventTypes.includes(type)}
              onClick={() => toggleEventType(type)}
            >
              {type}
            </FilterButton>
          ))}
        </div>
      </FilterSection>

      {/* Price Range Section */}
      <FilterSection
        title="PRICE RANGE"
        isOpen={openSections.priceRange}
        onToggle={() => toggleSection('priceRange')}
      >
        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={freeOfCost}
              onChange={(e) => setFreeOfCost(e.target.checked)}
              style={{
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                accentColor: '#000'
              }}
            />
            <span style={{
              fontSize: '16px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: '#000'
            }}>
              FREE OF COST
            </span>
          </label>

          <div style={{ position: 'relative', padding: '20px 0' }}>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              style={{
                width: '100%',
                height: '4px',
                background: '#000',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px'
            }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#000' }}>₹0</span>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#000' }}>₹1000</span>
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Date & Time Section */}
      <FilterSection
        title="DATE & TIME"
        isOpen={openSections.dateTime}
        onToggle={() => toggleSection('dateTime')}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '8px',
              color: '#000'
            }}>
              START DATE & TIME
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="date"
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '2px solid #000',
                  backgroundColor: '#000',
                  color: '#70E081',
                  fontSize: '14px',
                  fontFamily: 'Arial, sans-serif'
                }}
              />
              <input
                type="time"
                style={{
                  padding: '12px',
                  border: '2px solid #000',
                  backgroundColor: '#000',
                  color: '#70E081',
                  fontSize: '14px',
                  fontFamily: 'Arial, sans-serif'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '8px',
              color: '#000'
            }}>
              END DATE & TIME
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="date"
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '2px solid #000',
                  backgroundColor: '#000',
                  color: '#70E081',
                  fontSize: '14px',
                  fontFamily: 'Arial, sans-serif'
                }}
              />
              <input
                type="time"
                style={{
                  padding: '12px',
                  border: '2px solid #000',
                  backgroundColor: '#000',
                  color: '#70E081',
                  fontSize: '14px',
                  fontFamily: 'Arial, sans-serif'
                }}
              />
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Team Size Section */}
      <FilterSection
        title="TEAM SIZE"
        isOpen={openSections.teamSize}
        onToggle={() => toggleSection('teamSize')}
      >
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          {teamSizes.map(size => (
            <FilterButton
              key={size}
              selected={selectedTeamSizes.includes(size)}
              onClick={() => toggleTeamSize(size)}
            >
              {size}
            </FilterButton>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

export default EventFilter;