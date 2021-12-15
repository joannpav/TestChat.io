import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'

const SectionBreadCrumb = ({section, epic}) => (
  <Breadcrumb>
    <Breadcrumb.Section link>Home</Breadcrumb.Section>
    <Breadcrumb.Divider />    
    <Breadcrumb.Section link>{section}</Breadcrumb.Section>
    <Breadcrumb.Divider />    
    <Breadcrumb.Section active>{epic}</Breadcrumb.Section>
  </Breadcrumb>
)

export default SectionBreadCrumb