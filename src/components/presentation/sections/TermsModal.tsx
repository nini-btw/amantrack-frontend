"use client";

import Modal from "../layout/Modal";
import { useTranslations } from "next-intl";

export default function TermsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("presentation.terms");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("title")}>
      <section>
        <h3 className="text-white font-semibold mb-2">
          {t("sections.acceptance.title")}
        </h3>
        <p>{t("sections.acceptance.content")}</p>
      </section>

      <section>
        <h3 className="text-white font-semibold mb-2">
          {t("sections.account.title")}
        </h3>
        <p>{t("sections.account.content")}</p>
      </section>

      <section>
        <h3 className="text-white font-semibold mb-2">
          {t("sections.usage.title")}
        </h3>
        <p>{t("sections.usage.content")}</p>
      </section>

      <section>
        <h3 className="text-white font-semibold mb-2">
          {t("sections.liability.title")}
        </h3>
        <p>{t("sections.liability.content")}</p>
      </section>

      <section>
        <h3 className="text-white font-semibold mb-2">
          {t("sections.modifications.title")}
        </h3>
        <p>{t("sections.modifications.content")}</p>
      </section>
    </Modal>
  );
}
