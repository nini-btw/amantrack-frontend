"use client";

import Modal from "../layout/Modal";

export default function TermsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms of Service">
      <section>
        <h3 className="text-white font-semibold mb-2">
          1. Acceptance of Terms
        </h3>
        <p>
          By using AmanTrack, you agree to comply with these terms and all
          applicable laws and regulations.
        </p>
      </section>

      <section>
        <h3 className="text-white font-semibold mb-2">
          2. Account Responsibility
        </h3>
        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials and all activities under your account.
        </p>
      </section>

      <section>
        <h3 className="text-white font-semibold mb-2">3. Service Usage</h3>
        <p>
          The platform is intended for lawful safety compliance tracking and
          must not be used for illegal activities.
        </p>
      </section>

      <section>
        <h3 className="text-white font-semibold mb-2">
          4. Limitation of Liability
        </h3>
        <p>
          AmanTrack is not liable for indirect, incidental, or consequential
          damages arising from use of the service.
        </p>
      </section>

      <section>
        <h3 className="text-white font-semibold mb-2">5. Modifications</h3>
        <p>We reserve the right to update these terms at any time.</p>
      </section>
    </Modal>
  );
}
