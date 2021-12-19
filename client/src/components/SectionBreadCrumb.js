import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'


const SectionBreadCrumb = ({orgName, epicAll, epicName}) => (
  
  <Breadcrumb>
    <Breadcrumb.Section link>{orgName}</Breadcrumb.Section>
    <Breadcrumb.Divider />    
    <Breadcrumb.Section link href="/">{epicAll ? epicAll : "Epics"}</Breadcrumb.Section>
    <Breadcrumb.Divider />    
    <Breadcrumb.Section active>{epicName}</Breadcrumb.Section>
  </Breadcrumb>
)

export default SectionBreadCrumb