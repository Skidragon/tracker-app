import App, {Container} from "next/app";
import Page from "../components/global/Page";
import {ApolloProvider} from "react-apollo";
import withData from "../lib/withData";
import "../lib/dummy.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // This exposes the query to the user
    pageProps.query = ctx.query;
    return {pageProps};
  }
  render() {
    const {Component, apollo} = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

// is a higher order compoment, wrapped in withData
export default withData(MyApp);
