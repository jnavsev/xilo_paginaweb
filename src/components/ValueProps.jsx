import { FaMicroscope } from "react-icons/fa";
import { MdFingerprint, MdHealthAndSafety } from "react-icons/md";
import { BiCloudUpload } from "react-icons/bi";
import { IoHardwareChip } from "react-icons/io5";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { useTranslation } from "react-i18next";

export default function ValueProps() {
    const { t } = useTranslation("valueProps");

    const features = [
        { id: "capture", icon: <MdFingerprint /> },
        { id: "quality", icon: <FaMicroscope /> },
        { id: "standards", icon: <BiCloudUpload /> },
        { id: "hardware", icon: <IoHardwareChip /> },
        { id: "impact", icon: <MdHealthAndSafety /> },
        { id: "identification", icon: <HiOutlineDocumentSearch /> }
    ];

    return (
        <section id="solution" className="section">
            {/* TÍTULO CENTRAL */}
            <div className="section-title">
                <h2>{t("title")}</h2>
            </div>

            <div className="features">
                {features.map((f) => (
                    <div className="feature-wrapper" key={f.id}>
                        <div className="feature-card">
                            <div className="feature-icon">{f.icon}</div>
                            <h3>{t(`features.${f.id}.title`)}</h3>
                            <p>{t(`features.${f.id}.desc`)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
