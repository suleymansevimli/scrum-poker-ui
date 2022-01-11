import {
    Tabs,
    TabList,
    Box,
    Button,
    TabPanels,
    TabPanel,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react';
import SPModal from '../modal/sp-modal';
import CreateTaskForm from '../static/forms/create-task-form';
import PropTypes from 'prop-types';
import SPMenuTab from './sp-menu-tab';

const TabMenu = ({ tabs, tabPanels, add }) => {

    // add button's props
    const { hasAdd, onSubmit, addButtonLabel, modalTitle } = add;

    // modal open/close state
    const [isOpen, setIsOpen] = useState(false)

    /**
     * hasAdd props'u var ise add butonu görüntülenir.
     * 
     * @returns JSX.Element
     */
    const RenderAddButton = useMemo( ()=> () => {
        if (hasAdd) {
            return (
                <>
                    <Button
                        onClick={() => setIsOpen(true)}
                        bgColor={"green.500"}
                        mb="1">
                        {addButtonLabel}
                    </Button>
                    <SPModal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        modalTitle={modalTitle}
                    >
                        <CreateTaskForm onSubmit={onSubmit} />
                    </SPModal>
                </>
            )
        }
        
        return <></>
    },[isOpen])

    return (
        <Tabs isManual variant='enclosed'>
            <TabList display="flex" justifyContent="space-between">
                <Box d="flex">
                    <SPMenuTab tabs={tabs} />
                </Box>
                <RenderAddButton />
            </TabList>
            <TabPanels>
                {
                    tabPanels.map((tabPanel, index) => (
                        <TabPanel
                            padding={"0 !important"}
                            maxH={"280px"}
                            overflow={"auto"}
                            key={index}>
                                {tabPanel.children}
                        </TabPanel>
                    ))
                }
            </TabPanels>
        </Tabs>
    )
}

export default TabMenu;

TabMenu.propTypes = {
    tabs: PropTypes.array.isRequired,
    tabPanels: PropTypes.array.isRequired,
    add: PropTypes.object
}

TabMenu.defaultProps = {
    tabs: [],
    tabPanels: [],
    add: {
        hasAdd: false,
        onSubmit: () => { },
        addButtonLabel: ""
    }
}