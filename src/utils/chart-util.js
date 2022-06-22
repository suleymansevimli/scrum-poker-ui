export const generatePieChartData = ({ labels, data }) => {

    const colors = [ "#4299E1", "#9F7AEA", "#D53F8C", "#BEE3F8", "#2B6CB0", "#975A16",'#9B2C2C', "#F6E05E","#48BB78", "#81E6D9"]

    const chartObject = {
        labels: [...labels],
        datasets: [
            {
                label: '# of Votes',
                data,
                backgroundColor: colors.splice(0, data.length),
            },
        ],
    }

    return chartObject;
}