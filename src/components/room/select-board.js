import { useState, memo } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { projectConfig } from "../../config";
import ScrumPokerCard from "../../components/room/scrum-poker-card";

const SelectBoard = () => {

    const [selectedNumber, setSelectedNumber] = useState(null);

    return (
        <Grid
            gridGap={15}
            gridTemplateColumns={"auto auto auto auto auto"} >
            {
                projectConfig.cardNumbers.map((cardNumber,i) => (
                    <GridItem key={cardNumber+i}>
                        <ScrumPokerCard 
                            onSelected={setSelectedNumber}
                            cardNumber={cardNumber}
                            isSelected={selectedNumber === cardNumber} />
                    </GridItem>
                ))
            }
        </Grid>
    )
}

export default memo(SelectBoard);