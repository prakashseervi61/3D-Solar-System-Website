import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Journey Through the Solar System | 3D Interactive Experience",
  description:
    "Embark on an immersive 3D scrolling journey through our Solar System. Explore the Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune with cinematic transitions and stunning visuals.",
  keywords: [
    "solar system",
    "3D",
    "interactive",
    "space",
    "planets",
    "astronomy",
    "WebGL",
    "Three.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
