import React from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'
import Typography from "@material-ui/core/Typography"

const About = () => {
  const intl = useIntl()

   return (
    <Page
      pageTitle={intl.formatMessage({ id: 'about', defaultMessage: 'About' })}
    >
      <Scrollbar>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: 'about_text'})}
        </Typography>
      </Scrollbar>
    </Page>
  )
}
export default About