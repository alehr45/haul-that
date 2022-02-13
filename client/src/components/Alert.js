import React from "react"
import { Modal } from "react-bootstrap"

function Alert({ showModal, setShowModal }) {
  const handleCloseModal = () => setShowModal(false)

  return (
    <>
      <Modal onHide={handleCloseModal} show={showModal}>
        <h4 className="p-3 text-center">Please select a position first.</h4>
      </Modal>
    </>
  )
}

export default Alert
