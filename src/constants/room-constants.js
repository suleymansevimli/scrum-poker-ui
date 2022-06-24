import { Box, Text } from "@chakra-ui/react";
import TaskCard from "../components/task-card/task-card";

// Room tabs
export const tabs = [
    {
        id: 1,
        label: "Planned Tasks",
        key: "OPEN"
    },
    {
        id: 2,
        label: "On Process",
        key: "IN_PROGRESS"
    },
    {
        id: 3,
        label: "Done",
        key: "DONE"
    }
];

/**
 * Tab panel empty states
 * 
 * @param {'OPEN' | 'IN_PROGRESS' | 'DONE'} type 
 */
const TabPanelEmptyState = ({type}) => {
    const typeMap = {
        OPEN: 'There is no task added yet.',
        IN_PROGRESS: 'There is no running task.',
        DONE: 'There is no completed task.'
    }

    return (
        <Box padding={15}>
            <Text> {typeMap[type]} </Text>
        </Box>
    )
}

// tabPanels
export const TabPanels = (panelData) => ([
    {
        id: 1,
        children: panelData.OPEN.length
            ? panelData.OPEN.map(panel => <TaskCard  {...panel} />)
            : <TabPanelEmptyState type={"OPEN"} />
    },
    {
        id: 2,
        children: panelData.IN_PROGRESS.length
            ? panelData.IN_PROGRESS.map(panel => <TaskCard  {...panel} />)
            : <TabPanelEmptyState type={"IN_PROGRESS"} />
    },
    {
        id: 3,
        children: panelData.DONE.length
            ? panelData.DONE.map(panel => <TaskCard  {...panel} />)
            : <TabPanelEmptyState type={"DONE"} />
    }
]);