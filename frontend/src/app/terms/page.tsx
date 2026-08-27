export default function TermsAndConditions() {
  return (
    <div className="bg-obsidian text-ivory py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#0B0F19] tracking-tight border-b border-slate-200 pb-4">
        Terms & Conditions
      </h1>

      <p className="text-xs text-slate-500">Last updated: August 14, 2026</p>

      <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-[#0B0F19]">1. Project Scope & Deliverables</h2>
          <p>
            OSAAC delivers custom websites, AI automation, and branding graphics as defined 
            in the agreed-upon project specifications. Any features, pages, or integrations not explicitly documented 
            in the project scope agreement are treated as out-of-scope work and will incur additional fees.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-[#0B0F19]">2. Payments & Financial Tracking</h2>
          <p>
            All starting estimations are subject to adjustment based on finalized project features. 
            Before work begins, an Advance Payment is required. The remaining Balance Amount must be paid upon project 
            completion and verification, prior to final source files delivery or server deployment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-[#0B0F19]">3. Minor Updates & Paid Maintenance</h2>
          <p>
            The client receives exactly <strong>one minor post-delivery update free of charge</strong>. 
            This is limited to minor text revisions, banner modifications, or simple visual swaps, and is available 
            only once. All subsequent updates, additional feature requests, or system maintenance are charged 
            separately based on complexity. Permanent free maintenance is not provided.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-[#0B0F19]">4. Revisions & Approvals</h2>
          <p>
            Revisions must align with the initial conceptual direction. Major structural alterations or redesigns 
            which deviate from the approved project plan are treated as additional scope.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-[#0B0F19]">5. Cancellation & Refunds</h2>
          <p>
            Either party may terminate the project according to the terms of the specific agreement. 
            Refunds are evaluated based on completed work stages. Completed custom development work is non-refundable. 
            Refer to our Refund Policy for details.
          </p>
        </section>
      </div>
    </div>
  );
}
