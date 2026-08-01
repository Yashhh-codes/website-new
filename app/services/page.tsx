import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services | Branding, Web Development & Creative Strategy – Virrat",
  description: "Explore our premium creative services, including branding, printing, web development, digital marketing, graphic design, packaging, video production, and corporate gifting.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
