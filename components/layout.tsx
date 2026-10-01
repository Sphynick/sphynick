import React from 'react';
import Navbar from './navbar';
import ChatWidget from './chat-widget';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="relative min-h-screen flex flex-col bg-ink">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <ChatWidget />
  </div>
);

export default Layout;
