import { AiOutlineClose } from "react-icons/ai"
import "./Modal.styles.css"

type ModalProps = {
    children: React.ReactNode
    isOpened: boolean
    handleToggle: () => void
}

export default function Modal({
    children,
    isOpened,
    handleToggle,
}: ModalProps) {
    return isOpened ? (
        <div className="modal" onClick={handleToggle}>
            <div
                className="modal__content"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="modal__btn-toggle"
                    type="button"
                    onClick={handleToggle}
                >
                    <span className="sr-only">Fechar modal</span>
                    <AiOutlineClose aria-hidden />
                </button>
                {children}
            </div>
        </div>
    ) : null
}
