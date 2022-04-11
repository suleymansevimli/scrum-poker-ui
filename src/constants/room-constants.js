import TaskCard from "../components/task-card/task-card";

// Room tabs
export const tabs = [
    {
        id: 1,
        label: "All Tasks",
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

// tabPanels
export const TabPanels = (panelData) => ([
    {
        id: 1,
        children: panelData.OPEN.map(panel => <TaskCard  {...panel} />)
    },
    {
        id: 2,
        children: panelData.IN_PROGRESS.map(panel => <TaskCard  {...panel} />)
    },
    {
        id: 3,
        children: panelData.DONE.map(panel => <TaskCard  {...panel} />)
    }
]);