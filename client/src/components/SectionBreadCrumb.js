import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'


const SectionBreadCrumb = ({orgName, epicAll, epic}) => (
  
  <Breadcrumb>
    <Breadcrumb.Section link>{orgName}</Breadcrumb.Section>
    <Breadcrumb.Divider />    
    <Breadcrumb.Section link href="/">{epicAll ? epicAll : "Epics"}</Breadcrumb.Section>
    <Breadcrumb.Divider />    
    <Breadcrumb.Section active>{epic}</Breadcrumb.Section>
  </Breadcrumb>
)

export default SectionBreadCrumb