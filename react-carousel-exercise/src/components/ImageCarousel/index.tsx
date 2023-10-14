import { useState } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from "react-icons/io"
import "./ImageCarousel.styles.css"

import type { Image } from "../../types"

type ImageCarouselProps = {
    images: Image[]
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
    const [imageIndex, setImageIndex] = useState(0)

    function handlePreviousButton() {
        setImageIndex((prev) => {
            return prev === 0 ? images.length - 1 : prev - 1
        })
    }

    function handleNextButton() {
        setImageIndex((prev) => {
            return prev === images.length - 1 ? 0 : prev + 1
        })
    }

    return (
        <div className="carousel">
            {images.map(({ id, src, alt }, index) => (
                <img
                    key={id}
                    src={src}
                    alt={alt}
                    className="carousel__image"
                    style={{
                        transform: `translateX(calc(-100% * ${imageIndex}))`,
                    }}
                    aria-hidden={imageIndex === index}
                />
            ))}

            <button
                type="button"
                className="carousel__btn carousel__btn--prev"
                onClick={handlePreviousButton}
            >
                <span className="sr-only">Imagem anterior</span>
                <BsChevronLeft aria-hidden />
            </button>
            <button
                type="button"
                className="carousel__btn carousel__btn--next"
                onClick={handleNextButton}
            >
                <span className="sr-only">Próxima imagem</span>
                <BsChevronRight aria-hidden />
            </button>

            <div className="carousel__image-btns">
                {images.map((image, index) => (
                    <button
                        key={`${image.id}-btn`}
                        type="button"
                        className="carousel__image-btn"
                        onClick={() => setImageIndex(index)}
                    >
                        <span className="sr-only">
                            Selecionar imagem {index + 1}
                        </span>
                        {imageIndex === index ? (
                            <IoIosRadioButtonOn aria-hidden />
                        ) : (
                            <IoIosRadioButtonOff aria-hidden />
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}
