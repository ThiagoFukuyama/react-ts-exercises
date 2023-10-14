import { useState } from "react"
import type { Image } from "./types"
import ImageCarousel from "./components/ImageCarousel"
import Modal from "./components/Modal"
import "./App.css"

import car1 from "./assets/img/car-1.jpg"
import car2 from "./assets/img/car-2.jpg"
import car3 from "./assets/img/car-3.jpg"
import car4 from "./assets/img/car-4.jpg"
import car5 from "./assets/img/car-5.jpg"

const carouselImages: Image[] = [
    {
        id: "243242",
        src: car1,
        alt: "Primeiro carro",
    },
    {
        id: "658568",
        src: car2,
        alt: "Primeiro carro",
    },
    {
        id: "232423",
        src: car3,
        alt: "Primeiro carro",
    },
    {
        id: "45747",
        src: car4,
        alt: "Primeiro carro",
    },
    {
        id: "23552",
        src: car5,
        alt: "Primeiro carro",
    },
]

function App() {
    const [isModalOpened, setModalOpened] = useState(false)

    function handleModalToggle() {
        setModalOpened((prev) => !prev)
    }

    return (
        <main>
            <a href="#modal-section" className="skip-carousel-controls-btn">
                Pular controles do carrossel
            </a>

            <section className="carousel-section">
                <ImageCarousel images={carouselImages} />
            </section>

            <section id="modal-section" className="modal-section">
                <h1>Section Modal</h1>
                <button type="button" onClick={handleModalToggle}>
                    Abrir modal
                </button>
                <Modal
                    isOpened={isModalOpened}
                    handleToggle={handleModalToggle}
                >
                    <h1>Carrossel dentro do Modal</h1>
                    <ImageCarousel images={carouselImages} />
                </Modal>
            </section>
        </main>
    )
}

export default App
