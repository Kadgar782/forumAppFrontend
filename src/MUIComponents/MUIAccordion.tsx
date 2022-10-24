import { Accordion, AccordionSummary, AccordionDetails, Typography, Divider} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import React from "react"

 
export const MuiAccordion = ({header,content}) => {
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
                <Typography> {content}</Typography>
            </AccordionDetails>
         </Accordion>

        </div>
        )
    
}
    
