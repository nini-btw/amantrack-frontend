"use client";

import Modal from "../layout/Modal";
import { useTranslations } from "next-intl";

export default function PrivacyPolicyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("presentation.privacy");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("title")}>
      <section>
        <h3 className="text-white font-semibold mb-2">
          {t("sections.informationCollected.title")}
        </h3>
        <p>{t("sections.informationCollected.content")}</p>
      </section>

      <section>
        <h3 className="text-white font-semibold mb-2">
          {t("sections.howWeUse.title")}
        </h3>
        <p>{t("sections.howWeUse.content")}</p>
      </section>

      <section>
        <h3 className="text-white font-semibold mb-2">
          {t("sections.dataProtection.title")}
        </h3>
        <p>{t("sections.dataProtection.content")}</p>
      </section>

      <section>
        <h3 className="text-white font-semibold mb-2">
          {t("sections.thirdParty.title")}
        </h3>
        <p>{t("sections.thirdParty.content")}</p>
      </section>

      <section>
        <h3 className="text-white font-semibold mb-2">
          {t("sections.contact.title")}
        </h3>
        <p>
          {t("sections.contact.content")}{" "}
          <span className="text-white">contact@amantrack.com</span>
        </p>
      </section>
    </Modal>
  );
}
