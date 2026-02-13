"use client";

import Modal from "../layout/Modal";

export default function PrivacyPolicyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy">
      <section>
        <h3 className="text-white font-semibold mb-2">
          1. Information We Collect
        </h3>
        <p>
          AmanTrack collects account information, asset records, inspection
          data, and usage analytics necessary to provide compliance tracking
          services.
        </p>
      </section>

      <section>
        <h3 className="text-white font-semibold mb-2">
          2. How We Use Information
        </h3>
        <p>
          Data is used to operate the platform, improve performance, ensure
          compliance monitoring, and provide customer support.
        </p>
      </section>

      <section>
        <h3 className="text-white font-semibold mb-2">3. Data Protection</h3>
        <p>
          We implement industry-standard security practices to protect your data
          against unauthorized access or disclosure.
        </p>
      </section>

      <section>
        <h3 className="text-white font-semibold mb-2">
          4. Third-Party Services
        </h3>
        <p>
          AmanTrack may use secure third-party services for hosting, analytics,
          and payment processing.
        </p>
      </section>

      <section>
        <h3 className="text-white font-semibold mb-2">5. Contact</h3>
        <p>
          For privacy-related inquiries, contact us at
          <span className="text-white"> contact@amantrack.com</span>.
        </p>
      </section>
    </Modal>
  );
}
