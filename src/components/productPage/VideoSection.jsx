import React from "react";

export default function VideoSection() {
    return (
        <section className="product-s3 section">
            <div className="s3-inner">
                {/* IZQUIERDA: VÍDEO con marco */}
                <div className="s3-block s3-block-video">
                    <div className="s3-media s3-media-video">
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0"
                            title="Vídeo demostrativo"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>

                {/* DERECHA: DIBUJO grande SIN marco */}
                <div className="s3-block s3-block-image">
                    <div className="s3-media s3-media-img">
                        <img
                            src="/assets/team/Team.png"
                            alt="Equipo clínico y técnico"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
