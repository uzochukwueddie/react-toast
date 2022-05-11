import PropTypes from 'prop-types';

import './Checkmark.css';

const Checkmark = props => {
    const { label, checkValue, onCheckBoxChange } = props;

    return (
        <>
            <label className="checkmark-container">{label}
                <input 
                    id="auto"
                    type="checkbox"
                    name="checkbox"
                    value={checkValue}
                    onChange={onCheckBoxChange}
                />
                <span className="checkmark"></span>
            </label>
        </>
    );
}

Checkmark.propTypes = {
    label: PropTypes.string.isRequired,
    checkValue: PropTypes.bool.isRequired,
    onCheckBoxChange: PropTypes.func
}

export default Checkmark;
