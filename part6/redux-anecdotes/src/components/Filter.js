import { connect } from 'react-redux';
import { changeFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  const handleChange = (evt) => {
    props.changeFilter(evt.target.value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  changeFilter,
};

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);
export default ConnectedFilter;
