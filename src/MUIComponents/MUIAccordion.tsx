import { Accordion, AccordionSummary, AccordionDetails, Typography, Divider, Avatar} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import React from "react"

 
export const MuiAccordion = ({header,content,creator}) => {
    return( 
         <div>
         <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
                backgroundColor: "#cbcccc"
              }}>
                <Typography   >{header}</Typography>
            </AccordionSummary>
            <Divider
              sx={{border: 1}} />
            <AccordionDetails  sx={{
                backgroundColor: "#cbcccc"
              }} >
                <Avatar alt="Placeholder" src={creator} />
                <Typography> {content}</Typography>
            </AccordionDetails>
         </Accordion>

        </div>
        )
    
}

