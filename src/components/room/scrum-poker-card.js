import { Box, Container, Text, VStack } from "@chakra-ui/react";

const ScrumPokerCard = ({ isSelected, cardNumber, onSelected }) => {

    return (
        <Box 
            w={200} 
            h={270}
            borderRadius={8}
            bg={"tomato"}
            display={"flex"}
            alignItems={"center"}
            _hover={{ bg: "black", color: "white" }}
            cursor={"pointer"}
            transition={"all 0.3s ease-in-out"}
            className={`scrum-poker-card ${isSelected ? "selected" : ""}`}
            justifyContent={"center"} 
            onClick={() => onSelected(isSelected ? null : cardNumber)}
            >

            <Text fontFamily={"'Fugaz One', cursive"} fontSize={135} color={"white"}>
                {cardNumber}
            </Text>

        </Box>
    )
};

export default ScrumPokerCard;