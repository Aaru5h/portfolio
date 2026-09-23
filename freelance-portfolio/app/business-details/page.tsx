import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Business details — Aarush Gupta",
  description:
    "Business identity, services, contact information, and payment terms for Aarush Gupta's freelance development practice.",
};

export default function BusinessDetailsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: business.registrationName,
    alternateName: business.publicName,
    email: business.email,
    areaServed: "Worldwide",
    ...(siteUrl ? { url: siteUrl } : {}),
    knowsAbout: business.services,
  };

  return (
    <main className="legal-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="legal-nav" aria-label="Business details navigation">
        <Link className="wordmark" href="/" aria-label="Aarush Gupta home">
          aarush<span className="brand-dot">.</span>
        </Link>
        <Link className="text-link" href="/">
          Back to portfolio <span aria-hidden="true">→</span>
        </Link>
      </nav>

      <article className="legal-content">
        <header className="legal-hero">
          <p>Business information</p>
          <h1>
            Clear details.
            <br />
            Straightforward work<span className="orange-text">.</span>
          </h1>
          <p>
            The identity, services, contact information, and commercial terms
            behind this independent freelance practice.
          </p>
        </header>

        <section className="business-facts" aria-labelledby="identity-title">
          <div>
            <h2 id="identity-title">Business identity</h2>
            <p>
              The registered name below should match the name used on invoices,
              proposals, and payment-provider verification.
            </p>
          </div>
          <dl>
            <div>
              <dt>Business registration name</dt>
              <dd>{business.registrationName}</dd>
            </div>
            <div>
              <dt>Public name</dt>
              <dd>{business.publicName}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{business.location}</dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </dd>
            </div>
          </dl>
        </section>

        <section className="legal-section" aria-labelledby="services-heading">
          <h2 id="services-heading">Services offered</h2>
          <ul className="legal-service-list">
            {business.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
          <p>
            The exact scope, price, delivery schedule, and acceptance criteria
            are agreed in writing before paid work begins.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="payments-heading">
          <h2 id="payments-heading">Payments, cancellations, and refunds</h2>
          <p>
            Payments are requested only for an agreed project, deposit, or
            milestone. Payment instructions identify the relevant project or
            invoice. Online payment collection is currently being configured;
            clients can request verified payment details by email.
          </p>
          <p>
            Cancellation and refund eligibility depend on the written project
            agreement, completed work, and committed third-party costs. Any
            approved refund is returned through the original payment method.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="privacy-heading">
          <h2 id="privacy-heading">Privacy</h2>
          <p>
            This portfolio does not submit or store inquiry-form data on a
            server. The form opens a draft in the visitor’s email application.
            Information received by email is used to respond to the inquiry,
            prepare a proposal, and deliver agreed services.
          </p>
        </section>

      </article>
    </main>
  );
}
