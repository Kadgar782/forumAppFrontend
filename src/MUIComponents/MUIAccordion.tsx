import { Accordion, AccordionSummary, AccordionDetails, Typography} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import React from "react"
 
export const MuiAccordion = ({header,content}) => {
    return( 
         <div>
         <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}>
                <Typography>{header}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography> {content}</Typography>
            </AccordionDetails>
         </Accordion>

        </div>
        )
    
}
