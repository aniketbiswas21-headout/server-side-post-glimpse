
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t mt-12 py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground">
              &copy; {new Date().getFullYear()} PostHub — Built with Next.js, Jotai, and React Query
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              GitHub
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
