import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { createReport } from '../../actions/report';

const ReportForm = ({ type, createReport, id }) => {
  const [formData, setFormData] = useState({
    reason: '',
    reportedRef: ''
  });

  const [modalData, setModalData] = useState({
    showModal: false
  });

  const { reportedRef, reason } = formData;

  const { showModal } = modalData;

  const handleOpenModal = () => {
    setModalData({ showModal: true });
  };

  const handleCloseModal = () => {
    setModalData({ showModal: false });
  };
  useEffect(() => {
    setFormData({ reportedRef: type });
  }, []);

  const onChange = e => setFormData({ ...formData, reason: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    createReport(id, reason, reportedRef);
    handleCloseModal();
  };

  return (
    <Fragment>
      <button onClick={handleOpenModal}>Report {type}</button>
      <ReactModal
        isOpen={showModal}
        closeTimeoutMS={0}
        onRequestClose={handleCloseModal}
        onAfterClose={handleCloseModal}
        onAfterOpen={handleOpenModal}
      >
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Reason for this report'
              name='reason'
              value={reason}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <input
            type='submit'
            className='btn btn-primary'
            value={`Submit report for ${type}`}
          />
        </form>
      </ReactModal>
    </Fragment>
  );
};

ReportForm.propTypes = {};

const mapStateToProps = state => ({
  token: state.auth.token,
  listing: state.listing
});

export default connect(mapStateToProps, { createReport })(ReportForm);