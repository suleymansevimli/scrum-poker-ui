import { Tab } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../../redux/slices/planning-slice';

const SPMenuTab = ({ tabs }) => {

    const dispatch = useDispatch();

    const changeTab = (key) => {
        dispatch(setActiveTab(key))
    }

    return tabs.map((tab, index) => <Tab onClick={() => changeTab(tab.key)} key={index}> {tab.label} </Tab>)
}

export default SPMenuTab;

SPMenuTab.propTypes = {
    tabs: PropTypes.array.isRequired
}

SPMenuTab.defaultProps = {
    tabs: []
}