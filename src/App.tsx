import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import CertificatePreview from './components/CertificatePreview';
import Confetti from './components/Confetti';
import AnimatedLogo from './components/AnimatedLogo';
import { Trophy, Share2, Map } from 'lucide-react';

// Example certificate data for landing page
const exampleCertificate = {
  position: '1st Place',
  driverName: 'Max Verstappen',
  trackName: 'Daytona International Speedway',
  date: 'March 14, 2024',
  lapTime: '1:43.567',
  carName: 'Red Bull Racing RB19',
  split: 'Top Split',
  startPosition: 'P1',
  fastestLap: true,
  incidentPoints: 0,
  seriesName: 'FORMULA 1 WORLD CHAMPIONSHIP',
  achievement: 'GRAND PRIX VICTORY'
};

function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedRace, setSelectedRace] = useState(exampleCertificate);

  const handleCustomerId = async (customerId: string) => {
    console.log('Customer ID:', customerId);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleHomeClick = () => {
    setSelectedRace(exampleCertificate);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <Confetti active={showConfetti} />
      
      {/* Header */}
      <header className="pt-8 pb-12">
        <AnimatedLogo onHomeClick={handleHomeClick} />
      </header>

      <main className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Features */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold font-orbitron leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Showcase Your Racing Excellence
              </h1>
              <p className="text-xl text-gray-400">
                Transform your iRacing victories into stunning certificates. Share your achievements with the racing community.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Trophy className="w-6 h-6 text-[#FF1801] flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Custom track-specific certificate designs</h3>
                  <p className="text-gray-400">Each certificate features unique track layouts and custom designs based on your race location.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Share2 className="w-6 h-6 text-[#FF1801] flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">One-click social sharing</h3>
                  <p className="text-gray-400">Share your certificates directly to Twitter, Facebook, Reddit, and Discord.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Map className="w-6 h-6 text-[#FF1801] flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Track-specific designs</h3>
                  <p className="text-gray-400">Beautiful track outlines and custom graphics for each circuit.</p>
                </div>
              </div>
            </div>

            <LoginForm 
              onSubmit={handleCustomerId}
              loading={false}
            />
          </div>

          {/* Right Column - Example Certificate */}
          <div className="lg:pl-8">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF1801] to-[#FF4D4D] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <CertificatePreview data={selectedRace} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;