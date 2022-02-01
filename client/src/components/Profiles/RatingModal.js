import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { useQuery } from "@apollo/react-hooks"
import { QUERY_ME_BASIC } from "../../utils/queries"

function RatingModal({ finalRating, showModal, setShowModal }) {
  const handleCloseModal = () => setShowModal(false)
  const { data } = useQuery(QUERY_ME_BASIC)

  let me = data?.me || {}

  return (
    <>
      {me.position == "driver" ? (
        <Modal onHide={handleCloseModal} show={showModal}>
          <h5 className="rating-modal">-Your current driver rating is {finalRating}-</h5>
          <h6 className="rating-modal2">Complete more jobs to increase your rating!</h6>
        </Modal>
      ) : (
        <Modal onHide={handleCloseModal} show={showModal}>
          <h5 className="rating-modal3">-Your current customer rating is {finalRating}-</h5>
          <h6 className="rating-modal4">Create more jobs to increase your rating!</h6>
        </Modal>
      )}
    </>
  )
}

export default RatingModal
