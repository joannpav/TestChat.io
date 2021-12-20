import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'


const SectionBreadCrumb = ({trunk, branch, leaf}) => (  
  <Breadcrumb>
    <Breadcrumb.Section  href="/">{trunk}</Breadcrumb.Section>
    <Breadcrumb.Divider />    
    <Breadcrumb.Section>{branch ? branch : "Epics"}</Breadcrumb.Section>
    {leaf ? <Breadcrumb.Divider /> : <></>}    
    <Breadcrumb.Section active>{leaf}</Breadcrumb.Section>
  </Breadcrumb>
)


export default SectionBreadCrumb