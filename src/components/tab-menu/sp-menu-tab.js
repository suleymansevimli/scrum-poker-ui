import { Tab } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const SPMenuTab = ({tabs}) => tabs.map((tab, index) => <Tab key={index}> {tab.label} </Tab>)

export default SPMenuTab;

SPMenuTab.propTypes = {
    tabs: PropTypes.array.isRequired
}

SPMenuTab.defaultProps = {
    tabs: []
}