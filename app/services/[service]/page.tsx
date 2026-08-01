import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceClient from "./ServiceClient";

// Define the 8 allowed service slugs
const allowedServices = [
  "branding",
  "printing",
  "web-development",
  "digital-marketing",
  "graphic-design",
  "packaging-design",
  "video-production",
  "corporate-gifting",
];

export function generateStaticParams() {
  return allowedServices.map((service) => ({
    service,
  }));
}

type Props = {
  params: Promise<{ service: string }>;
};

const serviceTitles: Record<string, string> = {
  "branding": "Branding & Brand Identity",
  "printing": "Premium Printing & Collateral",
  "web-development": "Web Development & Engineering",
  "digital-marketing": "Digital Marketing & Growth",
  "graphic-design": "Graphic Design & Art Direction",
  "packaging-design": "Packaging & Unboxing Design",
  "video-production": "Cinematic Video Production",
  "corporate-gifting": "Bespoke Corporate Gifting",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  if (!allowedServices.includes(service)) {
    return {};
  }
  const title = serviceTitles[service] || "Service";
  return {
    title: `${title} | Our Services – Virrat`,
    description: `Learn about our premium ${title.toLowerCase()} services. We deliver strategic creative outcomes tailored for growth.`,
  };
}

export default async function Page({ params }: Props) {
  const { service } = await params;
  if (!allowedServices.includes(service)) {
    notFound();
  }

  return <ServiceClient service={service} />;
}
