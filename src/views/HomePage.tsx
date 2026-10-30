import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { PortalEntries } from '../components/PortalEntries';

interface HomePageProps {
  onNavigateToStudent: () => void;
  onNavigateToTeacher: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateToStudent,
  onNavigateToTeacher
}) => {
  return (
    <main id="main-content" className="home-page-wrapper">
      <HeroSection
        onExploreTopics={onNavigateToStudent}
        onOpenTeacherDashboard={onNavigateToTeacher}
      />
      <PortalEntries
        onOpenStudentPortal={onNavigateToStudent}
        onOpenTeacherDashboard={onNavigateToTeacher}
      />
    </main>
  );
};
