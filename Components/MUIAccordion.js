import { Accordion, AccordionSummary, AccordionDetails, Typography, Divider, Avatar} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import React from "react"

 
export const MuiAccordion = ({header,content,creatorAvatar,creatorName}) => {
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
                backgroundColor: "#cbcccc",
                paddingLeft: -10
              }} >
                <span>
                <Avatar alt="Placeholder" src={creatorAvatar} variant="rounded"
                sx={{
                  maxWidth: 35,
                  maxHeight: 35,
                  marginRight: 0.5
                }} />
                {creatorName}
                </span>
                <Typography> {content}</Typography>
            </AccordionDetails>
         </Accordion>

        </div>
        )
    
}
