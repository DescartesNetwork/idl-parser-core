import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import { ParserProvider } from 'parser'
import App from 'container/app'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <ParserProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </ParserProvider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
