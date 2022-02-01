import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"

function RatingModal({ finalRating, showModal, setShowModal }) {
  const handleCloseModal = () => setShowModal(false)
  return (
    <Modal onHide={handleCloseModal} show={showModal}>
      <h5 className="rating-modal">Your current rating is {finalRating} </h5>
    </Modal>
  )
}

export default RatingModal
