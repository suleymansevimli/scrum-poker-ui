import { Avatar, Box, Flex, Stack, Wrap, Text } from "@chakra-ui/react"
import { generatePieChartData } from "../../utils/chart-util"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskContent = ({ taskDetail = {} }) => {

    return (
        <>

            <Box>
                {taskDetail.taskDescription}
            </Box>

            <Text fontSize={54} textAlign={"center"}>
                <Text>Average Point</Text>
                <Text color={"yellow.400"}>{taskDetail?.result?.averageVote}</Text>
            </Text>

            <Flex justifyContent={"space-evenly"} alignItems="center">
                <Box w="500px" h="500px">
                    <Pie
                        data={
                            generatePieChartData({
                                labels: Object.keys(taskDetail?.result?.votes ?? []),
                                data: Object.values(taskDetail?.result?.votes ?? [])
                            })
                        }
                    />
                </Box>
                <div style={{ display: 'grid', gridTemplateColumns: "auto auto auto", gap: '10px' }}>
                    {taskDetail?.userVoteList?.map(({ user, vote }) => (
                        <Flex key={user.uniqueId} justifyContent={"space-between"} borderRadius="16" p="30" alignItems="center" width={250} height={150} border="1px solid #ddd">
                            <Stack flexDirection={"row"} alignItems="center" justifyContent={"center"}>
                                <Avatar name={user.userName} />
                                <Text fontWeight='bold' pl="13px" pb="8px" boxSizing="border-box">
                                    {user.userName}
                                </Text>
                            </Stack>

                            <Text d="flex" alignItems={"center"} justifyContent="center" fontSize='xl' bg="tomato" padding={"5"} w="5" h="5" borderRadius="100%">
                                {vote === 'coffee' ? '☕' : vote}
                            </Text>
                        </Flex>
                    ))}
                </div>
            </Flex>


        </>
    )
}

export default TaskContent;